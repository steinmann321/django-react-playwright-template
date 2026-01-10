#!/usr/bin/env python3
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wordtrainer.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        msg = (
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? "
            "Did you forget to activate a virtual environment?"
        )
        raise ImportError(msg) from exc
    execute_from_command_line(sys.argv)
