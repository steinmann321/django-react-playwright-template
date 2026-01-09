import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.FRONTEND_URL || `http://localhost:${process.env.FRONTEND_PORT || 5173}`

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
