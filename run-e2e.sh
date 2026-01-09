#!/usr/bin/env bash
set -euo pipefail

BLUE="\033[34m"; GREEN="\033[32m"; RED="\033[31m"; NC="\033[0m"
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERR]${NC} $1"; }

usage() {
  echo "Usage: $0 --all | --file=tests/health.spec.ts"; exit 2;
}

RUN_ALL=false; FILE_ARG=""
for arg in "$@"; do
  case $arg in
    --all) RUN_ALL=true ;;
    --file=*) FILE_ARG="${arg#*=}" ;;
    *) usage ;;
  esac
done
if [ "$RUN_ALL" = false ] && [ -z "$FILE_ARG" ]; then usage; fi

info "Starting app environment via run.sh..."
./run.sh &
RUN_PID=$!
sleep 5

# Load e2e env
E2E_ENV="e2e-tests/.env"
BACKEND_PORT=8000; FRONTEND_PORT=5173
if [ -f "$E2E_ENV" ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' "$E2E_ENV" | xargs -0 -I {} echo {} 2>/dev/null || grep -v '^#' "$E2E_ENV")
  BACKEND_PORT=${BACKEND_PORT:-8000}
  FRONTEND_PORT=${FRONTEND_PORT:-5173}
fi

info "Waiting for backend on $BACKEND_PORT..."
for i in $(seq 1 30); do
  if curl -fsS "http://localhost:${BACKEND_PORT}/api/health/" >/dev/null; then break; fi
  sleep 1
  if [ $i -eq 30 ]; then error "Backend not responding"; kill $RUN_PID || true; exit 1; fi
done

info "Waiting for frontend on $FRONTEND_PORT..."
for i in $(seq 1 30); do
  if curl -fsS "http://localhost:${FRONTEND_PORT}" >/dev/null; then break; fi
  sleep 1
  if [ $i -eq 30 ]; then error "Frontend not responding"; kill $RUN_PID || true; exit 1; fi
done

cd e2e-tests
if [ ! -d node_modules ]; then npm install; fi
if [ "$RUN_ALL" = true ]; then
  npm test
else
  npm test -- "$FILE_ARG"
fi
CODE=$?
cd - >/dev/null

info "Stopping app environment..."
kill $RUN_PID 2>/dev/null || true

if [ $CODE -eq 0 ]; then success "E2E passed"; else error "E2E failed"; fi
exit $CODE
