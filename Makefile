SHELL := /bin/bash

.PHONY: setup backend-venv backend-pip frontend-npm e2e-npm e2e-browsers dev e2e clean guard

BACKEND_DIR := backend
FRONTEND_DIR := frontend
E2E_DIR := e2e-tests
VENV := $(BACKEND_DIR)/.venv

# fluxid guard configuration
FLUXID_GUARD_REPO := https://github.com/steinmann321/fluxid-guard.git

setup: backend-venv backend-pip frontend-npm e2e-npm e2e-browsers
	@echo "[MAKE] Setup complete"

backend-venv:
	@test -d $(VENV) || python3 -m venv $(VENV)

backend-pip:
	@. $(VENV)/bin/activate && pip install -r $(BACKEND_DIR)/requirements.txt

frontend-npm:
	@cd $(FRONTEND_DIR) && npm install

e2e-npm:
	@cd $(E2E_DIR) && npm install

e2e-browsers:
	@cd $(E2E_DIR) && npx playwright install chromium

# Convenience targets
dev:
	@./run.sh

e2e:
	@./run-e2e.sh --all

clean:
	@rm -f $(BACKEND_DIR)/db.sqlite3
	@rm -rf $(FRONTEND_DIR)/node_modules $(E2E_DIR)/node_modules

# fluxid QA installation
guard:
	@if [ -z "$(PRESET)" ]; then \
		echo "[MAKE] ERROR: PRESET parameter is required"; \
		echo "[MAKE] Usage: make guard PRESET=<preset-name>"; \
		echo "[MAKE]"; \
		echo "[MAKE] Available presets:"; \
		echo "[MAKE]   - django-react-playwright-v2 (full-stack with Django, React, Playwright)"; \
		echo "[MAKE]   - django-react-playwright (legacy)"; \
		echo "[MAKE]   - django-only (Django backend only)"; \
		echo "[MAKE]   - go-only (Go backend only)"; \
		exit 1; \
	fi
	@echo "[MAKE] Cloning fluxid guard from GitHub..."
	@TEMP_DIR=$$(mktemp -d) && \
		git clone --quiet $(FLUXID_GUARD_REPO) "$$TEMP_DIR" && \
		echo "[MAKE] Installing fluxid guard with preset: $(PRESET)" && \
		cd "$$TEMP_DIR" && \
		echo "y" | ./install.sh $(CURDIR) --preset $(PRESET) && \
		cd $(CURDIR) && \
		rm -rf "$$TEMP_DIR" && \
		echo "[MAKE] fluxid guard installation complete (temporary files cleaned up)"
