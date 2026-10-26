import { expect, test } from './fixtures'

test('shows validation errors for an empty form', async ({ page }) => {
  await page.goto('/contato')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByRole('alert').first()).toContainText(/Revise os campos/)
  await expect(page.getByLabel(/Nome/)).toHaveAttribute('aria-invalid', 'true')
})

test('submits a contact message', async ({ page }) => {
  await page.goto('/contato')
  await page.getByLabel(/Nome/).fill('Teste Automatizado')
  await page.getByLabel(/E-mail/).fill('teste.e2e@example.org')
  await page.getByLabel(/Mensagem/).fill('Mensagem enviada pelo teste E2E do site da Quarau.')
  await page.getByLabel(/Li e concordo/).check()
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByText(/Mensagem enviada\. Obrigado!/)).toBeVisible({ timeout: 30_000 })
})
