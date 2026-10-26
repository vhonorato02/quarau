import { expect, test } from './fixtures'

test.use({ storageState: 'tests/e2e/.auth/admin.json' })

test('editor updates and publishes a page; the site reflects it', async ({ page, context }) => {
  const stamp = `Política de privacidade ${Date.now()}`
  await page.goto('/admin/collections/pages')
  await page.getByRole('link', { name: 'Política de privacidade' }).first().click()
  const title = page.getByLabel(/^Título/).first()
  await title.fill(stamp)
  await page
    .getByRole('button', { name: /Publicar/ })
    .first()
    .click()
  await expect(page.getByText(/publicad|atualizad|sucesso/i).first()).toBeVisible({
    timeout: 30_000,
  })

  const site = await context.newPage()
  await expect
    .poll(
      async () => {
        await site.goto('/privacidade')
        return site.title()
      },
      { timeout: 30_000 },
    )
    .toContain('Política de privacidade')
})

test('admin is in Portuguese and branded', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.getByText('Bem-vindo ao painel da Quarau')).toBeVisible()
  await expect(page.getByRole('link', { name: /Projetos \(cases\)/ }).first()).toBeVisible()
})
