#!/usr/bin/env bash
set -euo pipefail

# Bootstrap a new project directly from GitHub (clone into target and set up in place)
# Interactive flow: project name is mandatory; ports have defaults.
# Usage:
#  curl -fsSL https://raw.githubusercontent.com/steinmann321/django-react-playwright-template/main/bootstrap.sh | bash -s -- /path/to/your-project

REPO="https://github.com/steinmann321/django-react-playwright-template.git"
BRANCH="main"

if [[ $# -lt 1 ]]; then
  echo "Usage: bootstrap.sh <target_dir>"
  exit 2
fi
TARGET_DIR="$1"

# Dependencies check
for cmd in git python3 node make; do
  command -v "$cmd" >/dev/null || { echo "Missing dependency: $cmd"; exit 1; }
done

# Clone into target
git clone --depth 1 -b "$BRANCH" "$REPO" "$TARGET_DIR"
cd "$TARGET_DIR"

# Interactive inputs
NAME=""
while [[ -z "$NAME" ]]; do
  read -r -p "Project name (e.g., My Project): " NAME
  if [[ -z "$NAME" ]]; then echo "Project name is required."; fi
done
read -r -p "Backend port (default: 8000): " BACKEND_PORT || true
read -r -p "Frontend port (default: 5173): " FRONTEND_PORT || true
BACKEND_PORT=${BACKEND_PORT:-8000}
FRONTEND_PORT=${FRONTEND_PORT:-5173}

# Validate ports
re='^[0-9]+$'
if ! [[ $BACKEND_PORT =~ $re ]] || ((BACKEND_PORT < 1024 || BACKEND_PORT > 65535)); then
  echo "Invalid backend port: $BACKEND_PORT"; exit 1
fi
if ! [[ $FRONTEND_PORT =~ $re ]] || ((FRONTEND_PORT < 1024 || FRONTEND_PORT > 65535)); then
  echo "Invalid frontend port: $FRONTEND_PORT"; exit 1
fi

# Run rebranding and env configuration via embedded Python
python3 - <<'PY' "$NAME" "$BACKEND_PORT" "$FRONTEND_PORT"
import os, re, sys
from pathlib import Path

NAME = sys.argv[1]
BACKEND_PORT = sys.argv[2]
FRONTEND_PORT = sys.argv[3]
BASE_DIR = Path.cwd()

# Case conversions
def to_kebab_case(name: str) -> str:
    name = re.sub(r"[\s_]+", "-", name.strip())
    name = re.sub(r"-+", "-", name)
    return name.lower()

def to_snake_case(name: str) -> str:
    s = re.sub(r"[\s-]+", "_", name.strip())
    s = re.sub(r"_+", "_", s)
    return s.lower()

def to_pascal_case(name: str) -> str:
    parts = re.split(r"[\s_-]+", name.strip())
    return "".join(p.capitalize() for p in parts if p)

def to_upper_snake_case(name: str) -> str:
    return to_snake_case(name).upper()

kebab = to_kebab_case(NAME)
snake = to_snake_case(NAME)
pascal = to_pascal_case(NAME)
upper_snake = to_upper_snake_case(NAME)

replacements = {
    "myproject": snake,
    "my-project": kebab,
    "MyProject": pascal,
    "MY_PROJECT": upper_snake,
    "My Project": NAME,
}

exts = {".py", ".json", ".md", ".txt", ".ts", ".tsx", ".js", ".jsx", ".yaml", ".yml", ".toml", ".cfg", ".ini", ".sh", ".env.example"}
skip_dirs = {"node_modules", ".venv", "__pycache__", "dist", "build", ".git"}
exclude_files = {"setup.py", "create-project.sh", "bootstrap.sh"}

count = 0
for root, dirs, files in os.walk(BASE_DIR):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d not in skip_dirs]
    for f in files:
        p = Path(root) / f
        if p.name in exclude_files:
            continue
        if p.suffix in exts:
            try:
                text = p.read_text(encoding="utf-8")
            except Exception:
                continue
            for old, new in replacements.items():
                text = text.replace(old, new)
            try:
                p.write_text(text, encoding="utf-8")
                count += 1
            except Exception:
                pass
print(f"Processed files: {count}")

# Env files
backend_example = BASE_DIR / "backend" / ".env.example"
frontend_example = BASE_DIR / "frontend" / ".env.example"
e2e_example = BASE_DIR / "e2e-tests" / ".env.example"

def update_env(example: Path, env_path: Path, updates: dict):
    try:
        lines = example.read_text(encoding="utf-8").splitlines()
    except Exception:
        return
    new_lines = []
    for line in lines:
        if not line or line.strip().startswith("#") or "=" not in line:
            new_lines.append(line)
            continue
        k, v = line.split("=", 1)
        if k in updates:
            new_lines.append(f"{k}={updates[k]}")
        else:
            new_lines.append(line)
    try:
        env_path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
    except Exception:
        pass

update_env(backend_example, BASE_DIR / "backend" / ".env", {
    "BACKEND_PORT": str(BACKEND_PORT),
    "CORS_ALLOWED_ORIGINS": f"http://localhost:{FRONTEND_PORT}",
})
update_env(frontend_example, BASE_DIR / "frontend" / ".env", {
    "VITE_PORT": str(FRONTEND_PORT),
    "VITE_API_URL": f"http://localhost:{BACKEND_PORT}",
})
update_env(e2e_example, BASE_DIR / "e2e-tests" / ".env", {
    "BACKEND_PORT": str(BACKEND_PORT),
    "FRONTEND_PORT": str(FRONTEND_PORT),
    "BACKEND_URL": f"http://localhost:{BACKEND_PORT}",
    "FRONTEND_URL": f"http://localhost:{FRONTEND_PORT}",
})

# Rename backend package dir
old_dir = BASE_DIR / "backend" / "myproject"
new_dir = BASE_DIR / "backend" / snake
if old_dir.exists() and not new_dir.exists():
    try:
        old_dir.rename(new_dir)
        print(f"Renamed backend: {old_dir.name} -> {new_dir.name}")
    except Exception as e:
        print(f"[WARN] Rename failed: {e}")

# Remove generator files from target
for fname in ["setup.py", "create-project.sh", "bootstrap.sh"]:
    p = BASE_DIR / fname
    if p.exists():
        try:
            p.unlink()
        except Exception:
            pass

print("Rebranding and environment configuration complete.")
PY

# Install dependencies via Makefile
make setup || { echo "[WARN] 'make setup' failed. Please run manually in $TARGET_DIR."; }

# Next steps
cat <<EOF

Next steps:
  • Environment files created with configured ports
  • Use ./run.sh to refresh and start the app (kills old processes, resets DB, migrates, loads fixtures, restarts dev servers)
  • Use ./run-e2e.sh --all or --file=tests/health.spec.ts to run E2E in a clean environment
  • Backend: http://localhost:${BACKEND_PORT}
  • Frontend: http://localhost:${FRONTEND_PORT}
  • Health: http://localhost:${FRONTEND_PORT}/health
  • Project location: ${TARGET_DIR}
EOF
