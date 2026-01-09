#!/usr/bin/env bash
set -euo pipefail

# Wrapper to run the interactive template setup.
# Copies the template to a destination, rebrands placeholders, configures env files,
# renames the backend module, and installs dependencies via `make setup` in the target.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Running template setup..."
python3 setup.py
echo "\nSetup complete. See the printed next steps for URLs and commands."
