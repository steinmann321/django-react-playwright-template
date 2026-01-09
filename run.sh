#!/usr/bin/env bash
set -euo pipefail

BLUE="\033[34m"
GREEN="\033[32m"
RED="\033[31m"
NC="\033[0m"

info() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERR]${NC} $1"; }

# Kill existing dev processes (ignore errors)
info "Stopping existing dev processes if any..."
pkill -f "manage.py runserver" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 1

# Backend setup
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# Load backend env if present
BACKEND_PORT=8000
if [ -f "$BACKEND_DIR/.env" ]; then
  info "Loading backend env..."
  # shellcheck disable=SC2046
  export $(grep -v '^#' "$BACKEND_DIR/.env" | xargs -0 -I {} echo {} 2>/dev/null || grep -v '^#' "$BACKEND_DIR/.env")
  BACKEND_PORT=${BACKEND_PORT:-8000}
fi

# Frontend env
VITE_PORT=5173
if [ -f "$FRONTEND_DIR/.env" ]; then
  info "Loading frontend env..."
  # shellcheck disable=SC2046
  export $(grep -v '^#' "$FRONTEND_DIR/.env" | xargs -0 -I {} echo {} 2>/dev/null || grep -v '^#' "$FRONTEND_DIR/.env")
  VITE_PORT=${VITE_PORT:-5173}
fi

info "Refreshing backend (port $BACKEND_PORT)..."
cd "$BACKEND_DIR"

# Activate venv (assumes it exists)
if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
else
  error "Virtualenv not found at backend/.venv. Please create it and install requirements."
  exit 1
fi

# Fresh DB state
rm -f db.sqlite3 || true
python manage.py makemigrations
python manage.py migrate
if [ -f "fixtures/initial_data.json" ]; then
  python manage.py loaddata fixtures/initial_data.json || true
fi

# Start backend (detached)
nohup python manage.py runserver "0.0.0.0:$BACKEND_PORT" > ../backend.log 2>&1 &
BACK_PID=$!
echo $BACK_PID > ../backend.pid
cd - >/dev/null

info "Starting frontend (port $VITE_PORT)..."
cd "$FRONTEND_DIR"
# Assume node modules exist; do NOT install here
nohup npm run dev -- --port "$VITE_PORT" --host > ../frontend.log 2>&1 &
FRONT_PID=$!
echo $FRONT_PID > ../frontend.pid
cd - >/dev/null

# Wait a moment for servers to start
sleep 2

success "Backend: http://localhost:$BACKEND_PORT (PID: $BACK_PID)"
success "Frontend: http://localhost:$VITE_PORT (PID: $FRONT_PID)"
success "Health page: http://localhost:$VITE_PORT/health"
info "Logs: backend.log, frontend.log"
info "To stop: kill \$(cat backend.pid frontend.pid) or pkill -f 'manage.py runserver|vite'"
