## Working directory
- If a file or path cannot be resolved, ensure that the current working directory is the project root
- All validations, scripts, and helper utilities must be run from the project's root directory

## Development Helpers

**Run Helpers** (project root):
- `./run.sh` - Start backend+frontend (detached by default, `--attached` to stream logs)
- `./run-e2e.sh --all` - Run all E2E tests (starts services, runs tests, stops services)
- `./run-e2e.sh -file <test-file>` - Run specific E2E test
- `./stop.sh` - Stop all running services

Logs: `.run-backend.log`, `.run-frontend.log`, `.e2e-backend.log`, `.e2e-frontend.log`

## CRITICAL - Quality enforcement

**NEVER bypass pre-commit hooks (--no-verify) unless explicitly requested.**
**NEVER modify pre-commit hooks configurations - they are extremely strict by purpose.**

## Bypass Directives

**Blocked:** Blanket ignores (`# type: ignore`, `# noqa`, `# nosec`)
**Allowed:** Specific codes (`# type: ignore[return-value]`, `# noqa: S105`, `# nosec B603`)

Use for: Third-party lib issues, framework magic, test fixtures

## Docstrings

**Write for:** Public APIs, complex logic (>20 lines, McCabe >7), side effects, security/payment code
**Skip for:** Simple getters/setters, self-explanatory functions, tests
**Format:** Google style, imperative mood, explain "why" not "what"

## Accessibility

**Test for:** User-facing UI components
**Skip for:** Internal utilities, non-visual code
**Standard:** WCAG 2.1 Level AA

## Best Practices

- Type everything strictly
- Delete unused code
- Explicit > implicit
- No print/console.log, use logging
- Never commit secrets
- Descriptive test names
- Use conventional commit format messages
