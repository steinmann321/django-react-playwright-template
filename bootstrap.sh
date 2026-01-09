#!/usr/bin/env bash
set -euo pipefail

# Bootstrap a new project directly from GitHub (clone + setup in place or copy to dest)
# Usage examples:
#  curl -fsSL https://raw.githubusercontent.com/steinmann321/django-react-playwright-template/main/bootstrap.sh | bash -s -- --name "My Project" --backend-port 8000 --frontend-port 5173 --in-place
#  curl -fsSL https://raw.githubusercontent.com/steinmann321/django-react-playwright-template/main/bootstrap.sh | bash -s -- --name "My Project" --backend-port 8000 --frontend-port 5173 --dest /path/to/dir

REPO="https://github.com/steinmann321/django-react-playwright-template.git"
BRANCH="main"
TMP_DIR="$(mktemp -d)"
TARGET_DIR=""

# Parse flags (passed through to setup.py)
NAME=""; BACKEND_PORT=""; FRONTEND_PORT=""; DEST=""; IN_PLACE=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --name) NAME="$2"; shift 2;;
    --backend-port) BACKEND_PORT="$2"; shift 2;;
    --frontend-port) FRONTEND_PORT="$2"; shift 2;;
    --dest) DEST="$2"; shift 2;;
    --in-place) IN_PLACE=true; shift;;
    *) echo "Unknown option: $1"; exit 2;;
  esac
done

# Dependencies check
for cmd in git python3 node make; do
  command -v "$cmd" >/dev/null || { echo "Missing dependency: $cmd"; exit 1; }
done

# Clone into temp
git clone --depth 1 -b "$BRANCH" "$REPO" "$TMP_DIR/template"
cd "$TMP_DIR/template"

# Run setup.py (in-place or copy mode)
ARGS=( )
[[ -n "$NAME" ]] && ARGS+=("--name" "$NAME")
[[ -n "$BACKEND_PORT" ]] && ARGS+=("--backend-port" "$BACKEND_PORT")
[[ -n "$FRONTEND_PORT" ]] && ARGS+=("--frontend-port" "$FRONTEND_PORT")
if $IN_PLACE; then
  ARGS+=("--in-place")
else
  TARGET_DIR="${DEST:-}"
  [[ -n "$TARGET_DIR" ]] && ARGS+=("--dest" "$TARGET_DIR")
fi

python3 setup.py "${ARGS[@]}"

echo "\nBootstrap completed. Follow next steps printed by setup.py."
