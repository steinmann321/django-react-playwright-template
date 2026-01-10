Run pre commit hooks and systematically fix issues appearing. Run, find, fix, repeat.

**CRITICAL BUGFIX NEEDED**:
- Coding agent reported "The setup.ts file is being flagged as unused but it's referenced in vite.config.ts. Let me update the knip configuration to exclude test files:". Dont use huge wildcard excludes. Reconfigure this to be more granular. We need the actual test code to be treated as production code from our quality standards perspective.
