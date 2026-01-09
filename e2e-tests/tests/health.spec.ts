import { test, expect } from '@playwright/test'

test('health page shows healthy status and example warning', async ({ page }) => {
  await page.goto('/health')
  const card = page.getByTestId('health-card')
  await expect(card).toBeVisible()
  await expect(card).toContainText(/Healthy|Unhealthy/)
  await expect(card).toContainText(/-backend/)
  await expect(page.getByTestId('health-example')).toContainText('CRITICAL:')
  await page.screenshot({ path: 'test-results/health.png', fullPage: true })
})
