import { test, expect } from '@playwright/test'

// This test is intentionally designed to fail until the health scaffolding is removed/replaced.
test('health scaffolding must be removed before release', async ({ page }) => {
  await page.goto('/health')
  // Expect that the CRITICAL notice is not present in a production-ready project
  await expect(page.getByTestId('health-example')).not.toContainText('CRITICAL:')
})
