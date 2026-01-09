# MyProject Full-Stack Template

A production-ready starter that pairs a modern React frontend with a Django backend and Playwright end‑to‑end tests. It includes a working health check that exercises the full stack, shadcn‑style UI components, and developer helpers for fast local iteration.

## What You Get
- React 19 + Vite 7 + TypeScript, Tailwind CSS 4, shadcn‑style UI components (Card/Badge/Alert) used on the Health page
- Django 6 + Django REST Framework with a `/api/health/` endpoint and DB connectivity check
- Playwright E2E tests, including a guard‑rail test that intentionally fails until health scaffolding is removed
- Developer helpers: `run.sh` for clean refresh and `run-e2e.sh` for stable E2E; `Makefile` for one‑shot setup

## Requirements
- Python 3.14, Node.js 22, make (Unix‑like environments)

## Quick Start (Curl)
Bootstrap a new project directly from GitHub (mandatory name prompt; ports have defaults):
```
curl -fsSL https://raw.githubusercontent.com/steinmann321/django-react-playwright-template/main/bootstrap.sh | bash -s -- /path/to/your-project
```
The script clones into the target, prompts for your project name and ports (8000/5173 by default), rebrands placeholders, writes env files, renames the backend package, removes generator files, and installs dependencies via `make setup`.

Then in your project directory:
- Start/refresh: `./run.sh`
- E2E tests: `./run-e2e.sh --all`

## Health Scaffolding (Important)
This template ships with a health check pattern and a sample record loaded via fixtures. It includes an intentional failing E2E test to ensure you remove/replace this scaffolding before release.

CRITICAL: Remove, delete, or replace all health‑check related production/tests/E2E code before shipping.

## Scripts and Make Targets
- `./run.sh` – Refresh and start backend + frontend
- `./run-e2e.sh --all|--file=…` – E2E in a clean environment
- `make setup` – Create venv, pip install, npm install, Playwright browsers
- `make dev` – Shortcut for `./run.sh`
- `make e2e` – Shortcut for `./run-e2e.sh --all`

## Tech Stack
- Frontend: React 19, Vite 7, TypeScript, Tailwind 4, shadcn‑style components
- Backend: Python 3.14, Django 6, DRF, CORS
- E2E: Playwright

## Folder Layout (excerpt)
```
backend/      # Django app (api, health, fixtures, settings)
frontend/     # React + Vite + TS + Tailwind + shadcn‑style UI
e2e-tests/    # Playwright configuration and tests
run.sh        # Clean restart helper
run-e2e.sh    # E2E runner helper
Makefile      # One‑shot setup + convenience targets
```
