#!/usr/bin/env python3
# setup.py - MyProject Template Setup (rebranding)

import os
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


# --- Name conversion helpers ---
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


# --- file processing helpers ---
def replace_in_file(file_path: Path, replacements: dict):
    try:
        text = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"[WARN] Read failed: {file_path}: {e}")
        return
    for old, new in replacements.items():
        text = text.replace(old, new)
    try:
        file_path.write_text(text, encoding="utf-8")
    except Exception as e:
        print(f"[WARN] Write failed: {file_path}: {e}")


def update_env_file(example_path: Path, env_path: Path, updates: dict):
    try:
        lines = example_path.read_text(encoding="utf-8").splitlines()
    except Exception as e:
        print(f"[WARN] Read .env.example failed: {example_path}: {e}")
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
    except Exception as e:
        print(f"[WARN] Write .env failed: {env_path}: {e}")


# --- main flow ---
if __name__ == "__main__":
    print("\n🎨 MyProject Template Setup\n")
    project_name = input("Project name (e.g., My Project): ").strip()
    if not project_name:
        print("[ERROR] Project name cannot be empty.")
        sys.exit(1)

    backend_port_in = input("Backend port (default: 8000): ").strip()
    frontend_port_in = input("Frontend port (default: 5173): ").strip()

    def parse_port(s: str, default: int) -> int:
        if not s:
            return default
        if not s.isdigit():
            print(f"[ERROR] Invalid port: {s}")
            sys.exit(1)
        port = int(s)
        if port < 1024 or port > 65535:
            print(f"[ERROR] Port out of range: {port}")
            sys.exit(1)
        return port

    backend_port = parse_port(backend_port_in, 8000)
    frontend_port = parse_port(frontend_port_in, 5173)

    kebab = to_kebab_case(project_name)
    snake = to_snake_case(project_name)
    pascal = to_pascal_case(project_name)
    upper_snake = to_upper_snake_case(project_name)

    print("\nName variations:")
    print(f"  my-project (kebab): {kebab}")
    print(f"  myproject (snake): {snake}")
    print(f"  MyProject (pascal): {pascal}")
    print(f"  MY_PROJECT (upper_snake): {upper_snake}")
    print("Ports:")
    print(f"  Backend: {backend_port}")
    print(f"  Frontend: {frontend_port}")

    confirm = input("Proceed with rebranding? (y/n): ").strip().lower()
    if confirm != "y":
        print("Aborted.")
        sys.exit(0)

    replacements = {
        "myproject": snake,
        "my-project": kebab,
        "MyProject": pascal,
        "MY_PROJECT": upper_snake,
        "My Project": project_name,
    }

    # Process files
    exts = {
        ".py",
        ".json",
        ".md",
        ".txt",
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".yaml",
        ".yml",
        ".toml",
        ".cfg",
        ".ini",
        ".sh",
        ".env.example",
    }
    skip_dirs = {"node_modules", ".venv", "__pycache__", "dist", "build"}
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        # Skip hidden dirs and specified skips
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in skip_dirs]
        for f in files:
            p = Path(root) / f
            if p.suffix in exts:
                replace_in_file(p, replacements)
                count += 1
    print(f"Processed files: {count}")

    # Configure env files
    backend_example = BASE_DIR / "backend" / ".env.example"
    frontend_example = BASE_DIR / "frontend" / ".env.example"
    e2e_example = BASE_DIR / "e2e-tests" / ".env.example"

    update_env_file(
        backend_example,
        BASE_DIR / "backend" / ".env",
        {
            "BACKEND_PORT": str(backend_port),
            "CORS_ALLOWED_ORIGINS": f"http://localhost:{frontend_port}",
        },
    )
    update_env_file(
        frontend_example,
        BASE_DIR / "frontend" / ".env",
        {
            "VITE_PORT": str(frontend_port),
            "VITE_API_URL": f"http://localhost:{backend_port}",
        },
    )
    update_env_file(
        e2e_example,
        BASE_DIR / "e2e-tests" / ".env",
        {
            "BACKEND_PORT": str(backend_port),
            "FRONTEND_PORT": str(frontend_port),
            "BACKEND_URL": f"http://localhost:{backend_port}",
            "FRONTEND_URL": f"http://localhost:{frontend_port}",
        },
    )

    # Rename backend project dir
    old_dir = BASE_DIR / "backend" / "myproject"
    new_dir = BASE_DIR / "backend" / snake
    try:
        if old_dir.exists() and not new_dir.exists():
            old_dir.rename(new_dir)
            print(f"Renamed backend: {old_dir.name} -> {new_dir.name}")
        else:
            print("[INFO] No backend rename needed or target exists.")
    except Exception as e:
        print(f"[WARN] Rename failed: {e}")

    # Run Makefile-based setup to install dependencies
    print("\n[SETUP] Installing dependencies via Makefile (make setup)...")
    rc = os.system("make setup")
    if rc != 0:
        print("[WARN] 'make setup' failed. Please run it manually.")

    print("\nNext steps:")
    print("  • Environment files created with configured ports")
    print(
        "  • Use ./run.sh to refresh and start the app (kills old processes, resets DB, migrates, loads fixtures, restarts dev servers)"
    )
    print(
        "  • Use ./run-e2e.sh --all or --file=tests/health.spec.ts to run E2E in a clean environment"
    )
    print(f"  • Backend: http://localhost:{backend_port}")
    print(f"  • Frontend: http://localhost:{frontend_port}")
    print(f"  • Health: http://localhost:{frontend_port}/health")
