SHELL := /bin/bash

.PHONY: setup backend-venv backend-pip frontend-npm e2e-npm e2e-browsers dev e2e clean

BACKEND_DIR := backend
FRONTEND_DIR := frontend
E2E_DIR := e2e-tests
VENV := $(BACKEND_DIR)/.venv

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
