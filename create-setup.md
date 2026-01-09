# Template Project Setup Plan

> **Version Information**: This plan uses bleeding edge versions as of **January 9, 2026**. All version numbers include source URLs for verification and updates.

## Overview
Create a reusable full-stack template with React frontend, Django backend, and Playwright E2E tests. The template should be fully functional with a health check feature and easy to rebrand for new projects.

## Directory Structure

```
myproject/
├── backend/
│   ├── .venv/                    # Python virtual environment (gitignored)
│   ├── myproject/                # Django project directory
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── health/                   # Health check app
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── serializers.py
│   │   └── tests.py
│   ├── fixtures/
│   │   └── initial_data.json     # Sample fixture data
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── health/
│   │   │       └── HealthCheck.tsx
│   │   ├── pages/
│   │   │   └── HealthPage.tsx
│   │   ├── lib/
│   │   │   ├── utils.ts
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── components.json           # shadcn config
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── e2e-tests/
│   ├── tests/
│   │   └── health.spec.ts
│   ├── fixtures/
│   ├── playwright.config.ts
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── run.sh                        # Clean restart script
├── run-e2e.sh                    # E2E test runner
├── setup.py                      # Rebranding script
├── docker-compose.yml            # Optional: for containerized development
├── .gitignore
└── README.md
```

## Technology Stack (Bleeding Edge Versions - January 2026)

### Backend (Python)
- **Python**: 3.14.2 (released Dec 2025, support until Oct 2030)
  - Source: https://www.python.org/downloads/
- **Django**: 6.0.1 (latest stable)
  - Source: https://www.djangoproject.com/download/
  - PyPI: https://pypi.org/project/Django/
- **Django REST Framework**: 3.16.1
  - PyPI: https://pypi.org/project/djangorestframework/
- **django-cors-headers**: 4.9.0
  - PyPI: https://pypi.org/project/django-cors-headers/
- **python-dotenv**: 1.2.1
  - PyPI: https://pypi.org/project/python-dotenv/
- **psycopg2-binary**: 2.9.11
  - PyPI: https://pypi.org/project/psycopg2-binary/
- **PostgreSQL**: 18.1 (if using PostgreSQL instead of SQLite)
  - Source: https://www.postgresql.org/

### Frontend (Node/React)
- **Node.js**: 22 LTS
  - Source: https://nodejs.org/
- **React**: 19.2.3
  - npm: https://registry.npmjs.org/react/latest
- **react-dom**: 19.2.3
  - npm: https://registry.npmjs.org/react-dom/latest
- **TypeScript**: 5.9.3
  - npm: https://registry.npmjs.org/typescript/latest
- **Vite**: 7.3.1
  - npm: https://registry.npmjs.org/vite/latest
- **Tailwind CSS**: 4.1.18
  - npm: https://registry.npmjs.org/tailwindcss/latest
- **postcss**: 8.5.6
  - npm: https://registry.npmjs.org/postcss/latest
- **autoprefixer**: 10.4.23
  - npm: https://registry.npmjs.org/autoprefixer/latest
- **React Router (react-router-dom)**: 7.12.0
  - npm: https://registry.npmjs.org/react-router-dom/latest
- **TanStack Query (@tanstack/react-query)**: 5.90.16
  - npm: https://registry.npmjs.org/@tanstack/react-query/latest
- **axios**: 1.13.2
  - npm: https://registry.npmjs.org/axios/latest

### shadcn/ui Dependencies
- **@radix-ui/react-slot**: 1.2.4
  - npm: https://registry.npmjs.org/@radix-ui/react-slot/latest
- **class-variance-authority**: 0.7.1
  - npm: https://registry.npmjs.org/class-variance-authority/latest
- **clsx**: 2.1.1
  - npm: https://registry.npmjs.org/clsx/latest
- **tailwind-merge**: 3.4.0
  - npm: https://registry.npmjs.org/tailwind-merge/latest
- **lucide-react**: 0.562.0
  - npm: https://registry.npmjs.org/lucide-react/latest

### E2E Tests
- **Playwright (@playwright/test)**: 1.57.0
  - npm: https://registry.npmjs.org/@playwright/test/latest
- **TypeScript**: 5.9.3
  - npm: https://registry.npmjs.org/typescript/latest

## Placeholder Naming Convention

Use consistent placeholders throughout:
- `myproject` - Python module names, lowercase
- `my-project` - npm package names, kebab-case
- `MyProject` - PascalCase for classes
- `MY_PROJECT` - Environment variables, UPPER_SNAKE_CASE
- `My Project` - Human-readable display names

## Implementation Steps

### 1. Backend Setup

#### 1.1 Initialize Django Project
- Create `backend/` directory
- Set up Python 3.14 virtual environment: `python3.14 -m venv .venv`
- Create `requirements.txt`:
  ```txt
  Django==6.0.1
  djangorestframework==3.16.1
  django-cors-headers==4.9.0
  python-dotenv==1.2.1
  psycopg2-binary==2.9.11
  ```
- Activate venv and install: `source .venv/bin/activate && pip install -r requirements.txt`
- Initialize Django project: `django-admin startproject myproject .`
- Create health app: `python manage.py startapp health`

#### 1.2 Configure Django Settings
- Import `python-dotenv` at top of settings.py
- Configure CORS headers for frontend development
- Add REST framework settings
- Configure database (default SQLite for template simplicity)
- Set `ALLOWED_HOSTS` from environment variable
- Add `INSTALLED_APPS`: `rest_framework`, `corsheaders`, `health`
- Configure static files and media files
- Add environment variable support for `DEBUG`, `SECRET_KEY`, `DATABASE_URL`

#### 1.3 Health Check Implementation
- Create `/api/health/` endpoint in `health/views.py`:
  - Return JSON: `{"status": "healthy", "timestamp": "ISO8601", "service": "myproject-backend"}`
  - Use DRF APIView or simple JsonResponse
  - Add database connectivity check
  - Return 200 status code
- Create `health/urls.py` and wire to main `urls.py`
- Add serializer if using DRF
- Write unit tests in `health/tests.py`

#### 1.4 Fixtures and Sample Data
- Create `fixtures/initial_data.json` with sample data (if needed)
- Document fixture loading in README

#### 1.5 Environment Configuration
- Create `.env.example`:
  ```
  DEBUG=True
  SECRET_KEY=your-secret-key-here
  ALLOWED_HOSTS=localhost,127.0.0.1
  BACKEND_PORT=8000
  FRONTEND_URL=http://localhost:5173
  CORS_ALLOWED_ORIGINS=http://localhost:5173
  DATABASE_URL=sqlite:///db.sqlite3
  ```
- Add `.gitignore` (include `.venv/`, `db.sqlite3`, `__pycache__/`, etc.)

### 2. Frontend Setup

#### 2.1 Initialize Vite + React + TypeScript
- Create `frontend/` directory
- Initialize: `npm create vite@latest . -- --template react-ts`
- Update `package.json` name to `my-project-frontend`
- Install dependencies: `npm install`

#### 2.2 Install Tailwind CSS
- Follow Tailwind 4 setup for Vite
- `npm install -D tailwindcss@4.1.18 postcss@8.5.6 autoprefixer@10.4.23`
- Initialize config: `npx tailwindcss init -p`
- Configure `tailwind.config.js` with content paths
- Add Tailwind directives to `index.css`

#### 2.3 Install shadcn/ui
- Initialize shadcn: `npx shadcn@latest init`
- Configure components.json (use default settings)
- Install needed components:
  - `npx shadcn@latest add card`
  - `npx shadcn@latest add badge`
  - `npx shadcn@latest add button`
  - `npx shadcn@latest add alert`

#### 2.4 Install Additional Dependencies
- React Router: `npm install react-router-dom@7.12.0`
- TanStack Query: `npm install @tanstack/react-query@5.90.16`
- Axios: `npm install axios@1.13.2`
- Note: Specific versions ensure compatibility with bleeding edge setup

#### 2.5 Create Health Check UI
- Create `src/lib/api.ts`:
  - Export `API_BASE_URL` from env: `import.meta.env.VITE_API_URL`
  - Create `fetchHealthStatus()` function
- Create `src/components/health/HealthCheck.tsx`:
  - Use TanStack Query to fetch health status
  - Display status in shadcn Card component
  - Use Badge for status indicator (green/red)
  - Show timestamp
  - Handle loading and error states
  - Use Alert component for errors
- Create `src/pages/HealthPage.tsx`:
  - Import and render HealthCheck component
  - Add page title and description
- Configure routing in `App.tsx`:
  - Add route for `/health`
  - Add home page with link to health check

#### 2.6 Environment Configuration
- Create `.env.example`:
  ```
  VITE_API_URL=http://localhost:8000
  VITE_PORT=5173
  ```
- Add `.gitignore` (include `node_modules/`, `dist/`, `.env`)

### 3. E2E Tests Setup

#### 3.1 Initialize Playwright
- Create `e2e-tests/` directory
- Initialize: `npm init -y`
- Update `package.json` name to `my-project-e2e`
- Install Playwright: `npm install -D @playwright/test@1.57.0`
- Initialize config: `npx playwright install`
- Install browsers: `npx playwright install chromium`

#### 3.2 Configure Playwright
- Create `playwright.config.ts`:
  - Set `baseURL` from environment: `process.env.FRONTEND_URL || 'http://localhost:5173'`
  - Configure test directory: `./tests`
  - Set reasonable timeouts
  - Configure reporters (list, html)
  - Use only chromium for template simplicity

#### 3.3 Create Health Check E2E Test
- Create `tests/health.spec.ts`:
  - Test: Navigate to `/health` page
  - Wait for health status card to be visible
  - Assert that status badge shows "Healthy" or similar
  - Assert that timestamp is displayed
  - Assert that service name is correct
  - Test error state by stopping backend (optional, advanced)
- Use Playwright best practices:
  - Page object pattern (optional, for template might be overkill)
  - Proper selectors (data-testid attributes)
  - Explicit waits

#### 3.4 Environment Configuration
- Create `.env.example`:
  ```
  FRONTEND_URL=http://localhost:5173
  BACKEND_URL=http://localhost:8000
  FRONTEND_PORT=5173
  BACKEND_PORT=8000
  ```
- Add `.gitignore` (include `node_modules/`, `test-results/`, `playwright-report/`)

### 4. Run Scripts

#### 4.1 Create `run.sh`
**Purpose**: Bash script to cleanly restart the entire application with a fresh database state.

**Requirements**:
- Exit immediately if any command fails
- Use colored output (green for success, blue for info, no color for normal)
- Kill any existing `manage.py runserver` and `vite` processes (ignore errors if none running)
- Load environment variables from `.env` files in backend and frontend directories

**Port Configuration**:
- Read `BACKEND_PORT` from `backend/.env` (default: 8000)
- Read `VITE_PORT` from `frontend/.env` (default: 5173)
- Use these ports for starting services and displaying URLs

**Backend Setup Steps**:
1. Navigate to `backend/` directory
2. Load environment variables from `.env` if it exists
3. Activate the `.venv` virtual environment
4. Remove the existing `db.sqlite3` database file (ensures clean state)
5. Run Django migrations to recreate database schema
6. Load fixtures from `fixtures/initial_data.json` if the file exists
7. Start Django development server on configured port in background
8. Store the backend process ID for later cleanup

**Frontend Setup Steps**:
1. Navigate to `frontend/` directory
2. Load environment variables from `.env` if it exists
3. Check if `node_modules` exists, if not run `npm install`
4. Start Vite dev server on configured port in background (use `--port` flag)
5. Store the frontend process ID for later cleanup

**Output**:
- Show success message with URLs for backend, frontend, and health check page (using configured ports)
- Display "Press Ctrl+C to stop all services" message

**Process Management**:
- Set up trap to kill both backend and frontend processes on Ctrl+C
- Wait for user interrupt before exiting

#### 4.2 Create `run-e2e.sh`
**Purpose**: Bash script to run E2E tests in a clean, stable environment with predictable data.

**Argument Parsing**:
- Accept `--file=path/to/test.spec.ts` to run a single test file
- Accept `--all` to run all tests
- No default behavior - must specify one of the two options
- Show usage error if neither option is provided
- Show error for unknown options

**Port Configuration**:
- Load `BACKEND_PORT` from `e2e-tests/.env` (default: 8000)
- Load `FRONTEND_PORT` from `e2e-tests/.env` (default: 5173)
- Use these ports for health checks

**Environment Setup**:
1. Call `./run.sh` in background to start clean application environment
2. Store the run.sh process ID for cleanup
3. Wait 5 seconds for initial startup

**Health Check - Backend**:
- Loop up to 30 times (30 seconds total)
- Use curl to check if `http://localhost:${BACKEND_PORT}/api/health/` responds
- Break loop on success
- If 30 attempts fail, kill run.sh and exit with error

**Health Check - Frontend**:
- Loop up to 30 times (30 seconds total)
- Use curl to check if `http://localhost:${FRONTEND_PORT}` responds
- Break loop on success
- If 30 attempts fail, kill run.sh and exit with error

**Test Execution**:
1. Navigate to `e2e-tests/` directory
2. Load environment variables from `.env` if it exists
3. Check if `node_modules` exists, if not run `npm install`
4. If `--all` flag: run `npm test` (all tests)
5. If `--file=<path>` flag: run `npm test -- "<path>"` (single test)
6. Capture the test exit code

**Cleanup and Exit**:
- Kill the run.sh process (stops backend and frontend)
- Show success message if tests passed (exit code 0)
- Show failure message if tests failed (exit code non-zero)
- Exit with the test exit code

**Colors**: Use green for success, blue for info, red for errors

#### 4.3 Make Scripts Executable
```bash
chmod +x run.sh run-e2e.sh
```

### 5. Rebranding Setup Script

#### 5.1 Create `setup.py`
**Purpose**: Python script to rebrand the template for a new project and configure ports.

**Name Conversion Functions**:
Create helper functions to convert project name to different cases:
- `to_kebab_case()`: Convert to kebab-case (e.g., "my-project")
- `to_snake_case()`: Convert to snake_case (e.g., "myproject")
- `to_pascal_case()`: Convert to PascalCase (e.g., "MyProject")
- `to_upper_snake_case()`: Convert to UPPER_SNAKE_CASE (e.g., "MY_PROJECT")

**File Processing Functions**:
- `replace_in_file(file_path, replacements)`:
  - Read file contents with UTF-8 encoding
  - Loop through replacements dictionary and replace all occurrences
  - Write updated content back to file
  - Catch and log any exceptions as warnings

- `update_env_file(env_path, updates)`:
  - Read .env.example file
  - Update specified values (ports, URLs)
  - Write to .env file (not .env.example)

**Main Script Flow**:

1. **User Input - Project Name**:
   - Display welcome message: "🎨 MyProject Template Setup"
   - Prompt user for project name
   - Exit with error if name is empty

2. **User Input - Port Configuration**:
   - Prompt: "Backend port (default: 8000):"
   - Prompt: "Frontend port (default: 5173):"
   - Allow empty input to use defaults
   - Validate ports are numeric and in valid range (1024-65535)

3. **Generate Variations**:
   - Convert input name to all case variations
   - Display all variations to user for review
   - Display selected ports

4. **Confirmation**:
   - Ask user to confirm: "Proceed with rebranding? (y/n)"
   - Exit if user doesn't confirm

5. **Create Replacements Dictionary**:
   ```
   'myproject' → snake_case version
   'my-project' → kebab-case version
   'MyProject' → PascalCase version
   'MY_PROJECT' → UPPER_SNAKE_CASE version
   'My Project' → original input
   ```

6. **Process Files**:
   - Define file extensions to process: .py, .json, .md, .txt, .ts, .tsx, .js, .jsx, .yaml, .yml, .toml, .cfg, .ini, .sh, .env.example
   - Recursively find all files with these extensions
   - Skip directories: node_modules, .venv, __pycache__, dist, build, and any hidden directories
   - Apply replacements to each file
   - Count and report number of files processed

7. **Configure Environment Files**:
   - Copy `backend/.env.example` to `backend/.env` and update:
     - `BACKEND_PORT` with selected backend port
     - `CORS_ALLOWED_ORIGINS` with `http://localhost:{frontend_port}`
   - Copy `frontend/.env.example` to `frontend/.env` and update:
     - `VITE_PORT` with selected frontend port
     - `VITE_API_URL` with `http://localhost:{backend_port}`
   - Copy `e2e-tests/.env.example` to `e2e-tests/.env` and update:
     - `BACKEND_PORT` with selected backend port
     - `FRONTEND_PORT` with selected frontend port
     - `BACKEND_URL` with `http://localhost:{backend_port}`
     - `FRONTEND_URL` with `http://localhost:{frontend_port}`

8. **Rename Backend Directory**:
   - Check if `backend/myproject/` directory exists
   - Rename it to `backend/<snake_case_name>/`
   - Display old → new name

9. **Display Next Steps**:
   - List post-setup instructions:
     - Environment files have been created with your port configuration
     - Run ./run.sh to start application
     - Run ./run-e2e.sh --all to test
   - Show URLs with configured ports:
     - Backend: `http://localhost:{backend_port}`
     - Frontend: `http://localhost:{frontend_port}`
     - Health: `http://localhost:{frontend_port}/health`

**Script Requirements**:
- Make executable with shebang: `#!/usr/bin/env python3`
- Use pathlib.Path for file operations
- Handle errors gracefully with try/except blocks
- Validate port inputs (numeric, valid range)

#### 5.2 Make Setup Script Executable
```bash
chmod +x setup.py
```

### 6. Documentation

#### 6.1 Main README.md
Create comprehensive documentation including:
- Project overview
- Prerequisites (Python 3.14, Node 22)
- Quick start guide
- How to use as a template
- Rebranding instructions
- Architecture overview
- Development workflow
- Available scripts

#### 6.2 Individual READMEs
Create README.md in each subdirectory:
- `backend/README.md` - Django setup, API docs
- `frontend/README.md` - React setup, component docs
- `e2e-tests/README.md` - Test setup, running tests

### 7. Version Control

#### 7.1 .gitignore Files

**Root `.gitignore`**:
```
# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# OS
Thumbs.db
```

**Backend `.gitignore`** (Python/Django specific):
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
*.egg-info/
dist/
build/

# Virtual Environment
.venv/
venv/
ENV/
env/

# Django
*.log
db.sqlite3
db.sqlite3-journal
media/
staticfiles/

# Environment
.env
.env.local

# pytest
.pytest_cache/
.coverage
htmlcov/

# mypy
.mypy_cache/
```

**Frontend `.gitignore`** (React/Vite/TypeScript specific):
```
# Dependencies
node_modules/

# Build output
dist/
dist-ssr/
build/

# Environment
.env
.env.local
.env.production.local
.env.development.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

# OS
.DS_Store
Thumbs.db
```

**E2E Tests `.gitignore`** (Playwright specific):
```
# Dependencies
node_modules/

# Test artifacts
test-results/
playwright-report/
playwright/.cache/

# Screenshots and videos (optional - remove if you want to commit them)
screenshots/
videos/

# Environment
.env
.env.local

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

#### 7.2 Initialize Git
```bash
git init
git add .
git commit -m "Initial template setup"
```

### 8. Docker Support (Optional)

#### 8.1 Create docker-compose.yml
Optional but useful for containerized development:
- Service for backend (Python + Django)
- Service for frontend (Node + Vite)
- Service for PostgreSQL (optional)
- Volume mounts for development
- Network configuration

#### 8.2 Create Dockerfiles
- `backend/Dockerfile`
- `frontend/Dockerfile`

### 9. Additional Enhancements

#### 9.1 Pre-commit Hooks
- Set up black, flake8 for Python
- Set up prettier, eslint for TypeScript/React
- Create `.pre-commit-config.yaml`

#### 9.2 CI/CD Template
- Create `.github/workflows/ci.yml` for GitHub Actions
- Run tests on push
- Lint checking

#### 9.3 VS Code Configuration
- Create `.vscode/settings.json` with recommended settings
- Create `.vscode/extensions.json` with recommended extensions

## Testing the Template

### Before Committing
1. Run `./run.sh` - ensure app starts cleanly
2. Visit http://localhost:5173/health - verify UI works
3. Check backend at http://localhost:8000/api/health/ - verify API
4. Run `./run-e2e.sh --all` - ensure E2E tests pass
5. Test rebranding: `python setup.py` with test name
6. Verify rebranded project still works

### Validation Checklist
- [ ] Backend starts with migrations
- [ ] Backend loads fixtures successfully
- [ ] Health endpoint returns correct JSON
- [ ] Frontend builds and serves
- [ ] Health page displays backend status
- [ ] E2E test passes
- [ ] run.sh cleanly restarts everything
- [ ] run-e2e.sh runs individual test with --file
- [ ] run-e2e.sh runs all tests with --all
- [ ] setup.py successfully rebrands project
- [ ] All environment variables documented
- [ ] READMEs are complete and accurate

## Maintenance Notes

### Keeping Dependencies Updated
- **Backend**: `pip list --outdated` and update requirements.txt
- **Frontend**: `npm outdated` and update package.json
- **E2E**: `npm outdated` in e2e-tests directory
- **Check latest versions**:
  - Python packages: Visit PyPI links in Technology Stack section
  - npm packages: Run `npm view <package-name> version` or visit npm registry links
- **After updating**: Always run full test suite and verify app functionality
- **Regularly test**: Test after updates to catch breaking changes early

### Version Pinning Strategy
- **Bleeding Edge Approach**: All versions are pinned to exact latest versions
- For production use: Consider using ranges like `Django>=6.0,<7.0` for flexibility
- Lock files: commit `package-lock.json` for frontend consistency
- Update versions periodically by checking the sources listed in Technology Stack section

## Common Issues and Solutions

### Port Conflicts
- Backend default: 8000 (configurable via `BACKEND_PORT` in `backend/.env`)
- Frontend default: 5173 (configurable via `VITE_PORT` in `frontend/.env`)
- E2E tests: Configure ports in `e2e-tests/.env` to match
- If ports are taken:
  1. Copy `.env.example` to `.env` in each directory
  2. Set `BACKEND_PORT` and `VITE_PORT` (or `FRONTEND_PORT`) to available ports
  3. Ensure all three `.env` files use consistent port numbers
  4. Update `CORS_ALLOWED_ORIGINS` in backend/.env to match frontend port

### Virtual Environment
- Always activate: `source backend/.venv/bin/activate`
- Ensure using Python 3.14+: `python --version`

### Node Modules
- If issues, remove `node_modules` and reinstall
- Use `npm ci` for clean install

### Database Issues
- run.sh removes and recreates database
- For persistent data, use PostgreSQL instead of SQLite

## Notable Bleeding Edge Features

### Python 3.14
- Released December 2025, very new release
- Includes performance improvements and new syntax features
- Fully supported until October 2030

### Django 6.0
- Latest major version with new features
- If stability is critical, consider Django 5.2 LTS (supported until April 2028)
- Breaking changes from 5.x documented at: https://docs.djangoproject.com/en/6.0/releases/6.0/

### React 19
- Latest major version with new features like Actions and improved hooks
- Significant improvements to concurrent rendering
- May have ecosystem compatibility considerations with some older libraries

### Vite 7
- Latest major version with enhanced performance
- Breaking changes from Vite 5/6, check migration guides
- Faster HMR and build times

### Tailwind CSS 4
- New CSS-first engine (no longer PostCSS-based by default)
- Significant performance improvements
- New configuration format - see: https://tailwindcss.com/docs/v4-beta

### React Router 7
- Latest major version with enhanced data loading patterns
- New APIs and patterns - migration from v6 may require adjustments
- Better TypeScript support
