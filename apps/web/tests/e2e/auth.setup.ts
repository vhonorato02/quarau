import { expect, test as setup } from '@playwright/test'

export const ADMIN_STATE = 'tests/e2e/.auth/admin.json'

setup('admin login', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByLabel(/e-?mail/i).fill(process.env.E2E_ADMIN_EMAIL ?? 'e2e@quarau.local')
  await page
    .getByLabel(/senha|password/i)
    .fill(process.env.E2E_ADMIN_PASSWORD ?? 'e2e-admin-password')
  await page.getByRole('button', { name: /entrar|login/i }).click()
  await expect(page.getByRole('heading', { name: /O que você quer fazer hoje/ })).toBeVisible({
    timeout: 60_000,
  })
  await page.context().storageState({ path: ADMIN_STATE })
})
