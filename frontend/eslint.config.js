export default [
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "**/*.config.{js,ts}",
      "**/*.{ts,tsx}", // TypeScript files handled by tsc
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
    },
  },
];
