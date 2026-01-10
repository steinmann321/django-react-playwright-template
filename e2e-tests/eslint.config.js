export default [
  {
    ignores: [
      "node_modules",
      "playwright-report",
      "test-results",
      "**/*.{ts,tsx}", // TypeScript files handled by tsc
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
    },
  },
];
