#!/usr/bin/env python3
# setup.py - MyProject Template Setup (copy + rebrand + install)

import os
import re
import sys
import shutil
import subprocess
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


# --- copy helpers ---
EXCLUDE_DIRS = {
    ".git",
    "node_modules",
    ".venv",
    "__pycache__",
    "dist",
    "build",
    "playwright-report",
    "test-results",
}
EXCLUDE_FILES = {"setup.py", "create-project.sh"}


def should_exclude(path: Path) -> bool:
    name = path.name
    if name in EXCLUDE_FILES:
        return True
    parts = set(p.name for p in path.parents)
    if any(d in parts for d in EXCLUDE_DIRS):
        return True
    return False


def copy_template(src: Path, dst: Path):
    if not dst.exists():
        dst.mkdir(parents=True, exist_ok=True)
    for root, dirs, files in os.walk(src):
        root_path = Path(root)
        # Skip excluded dirs
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for f in files:
            fp = root_path / f
            if should_exclude(fp):
                continue
            rel = fp.relative_to(src)
            target = dst / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(fp, target)


# --- main flow ---
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="MyProject Template Setup")
    parser.add_argument("--name", help="Project display name (e.g., My Project)")
    parser.add_argument("--backend-port", type=int, help="Backend port", default=None)
    parser.add_argument("--frontend-port", type=int, help="Frontend port", default=None)
    parser.add_argument("--dest", help="Destination directory (copy mode)")
    parser.add_argument(
        "--in-place", action="store_true", help="Operate on current directory (no copy)"
    )
    args = parser.parse_args()

    print("\n🎨 MyProject Template Setup\n")

    if args.name:
        project_name = args.name.strip()
    else:
        project_name = input("Project name (e.g., My Project): ").strip()
    if not project_name:
        print("[ERROR] Project name cannot be empty.")
        sys.exit(1)

    if args.backend_port is not None:
        backend_port_in = str(args.backend_port)
    else:
        backend_port_in = input("Backend port (default: 8000): ").strip()

    if args.frontend_port is not None:
        frontend_port_in = str(args.frontend_port)
    else:
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

    if args.in_place:
        target_dir = BASE_DIR.resolve()
    else:
        default_dst = (BASE_DIR / kebab).resolve()
        dest_in = (
            args.dest.strip()
            if args.dest
            else input(f"Destination directory (default: {default_dst}): ").strip()
        )
        target_dir = Path(dest_in) if dest_in else default_dst
        target_dir = target_dir.resolve()

    print("\nName variations:")
    print(f"  my-project (kebab): {kebab}")
    print(f"  myproject (snake): {snake}")
    print(f"  MyProject (pascal): {pascal}")
    print(f"  MY_PROJECT (upper_snake): {upper_snake}")
    print("Ports:")
    print(f"  Backend: {backend_port}")
    print(f"  Frontend: {frontend_port}")
    print(f"Destination: {target_dir}")

    if not args.in_place:
        confirm = (
            input("Proceed with copy + rebrand + install? (y/n): ").strip().lower()
        )
        if confirm != "y":
            print("Aborted.")
            sys.exit(0)
        print("\n[SETUP] Copying template files...")
        copy_template(BASE_DIR, target_dir)
    else:
        print("\n[SETUP] Operating in place (no copy).")

    # Apply replacements to copied files
    print("[SETUP] Applying rebranding placeholders...")
    replacements = {
        "myproject": snake,
        "my-project": kebab,
        "MyProject": pascal,
        "MY_PROJECT": upper_snake,
        "My Project": project_name,
    }

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
    skip_dirs = {"node_modules", ".venv", "__pycache__", "dist", "build", ".git"}
    count = 0
    for root, dirs, files in os.walk(target_dir):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in skip_dirs]
        for f in files:
            p = Path(root) / f
            if p.name in EXCLUDE_FILES:
                continue
            if p.suffix in exts:
                replace_in_file(p, replacements)
                count += 1
    print(f"Processed files: {count}")

    # Configure env files in target
    backend_example = target_dir / "backend" / ".env.example"
    frontend_example = target_dir / "frontend" / ".env.example"
    e2e_example = target_dir / "e2e-tests" / ".env.example"

    update_env_file(
        backend_example,
        target_dir / "backend" / ".env",
        {
            "BACKEND_PORT": str(backend_port),
            "CORS_ALLOWED_ORIGINS": f"http://localhost:{frontend_port}",
        },
    )
    update_env_file(
        frontend_example,
        target_dir / "frontend" / ".env",
        {
            "VITE_PORT": str(frontend_port),
            "VITE_API_URL": f"http://localhost:{backend_port}",
        },
    )
    update_env_file(
        e2e_example,
        target_dir / "e2e-tests" / ".env",
        {
            "BACKEND_PORT": str(backend_port),
            "FRONTEND_PORT": str(frontend_port),
            "BACKEND_URL": f"http://localhost:{backend_port}",
            "FRONTEND_URL": f"http://localhost:{frontend_port}",
        },
    )

    # Rename backend project dir in target
    old_dir = target_dir / "backend" / "myproject"
    new_dir = target_dir / "backend" / snake
    try:
        if old_dir.exists() and not new_dir.exists():
            old_dir.rename(new_dir)
            print(f"Renamed backend: {old_dir.name} -> {new_dir.name}")
        else:
            print("[INFO] No backend rename needed or target exists.")
    except Exception as e:
        print(f"[WARN] Rename failed: {e}")

    # Install dependencies in target via Makefile
    print("\n[SETUP] Installing dependencies via Makefile (make setup)...")
    try:
        subprocess.run(["make", "setup"], cwd=str(target_dir), check=True)
    except Exception as e:
        print(
            f"[WARN] 'make setup' failed: {e}. Please run it manually in {target_dir}."
        )

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
    print(f"  • Project location: {target_dir}")
