import { expect, test } from './fixtures'

test('search finds migrated projects', async ({ page }) => {
  await page.goto('/busca')
  await page.getByRole('searchbox', { name: /O que você procura/ }).fill('quilombolas')
  await page.getByRole('button', { name: 'Buscar' }).click()
  await expect(page).toHaveURL(/q=quilombolas/)
  await expect(page.getByRole('link', { name: /Quipá/ }).first()).toBeVisible()
})
