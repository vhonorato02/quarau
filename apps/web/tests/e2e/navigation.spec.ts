import { expect, test } from './fixtures'

test('main menu reaches the portfolio and a case study', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Projetos' }).click()
  } else {
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click()
  }
  await expect(page).toHaveURL(/\/projetos$/)
  await page
    .getByRole('link', { name: /Projeto Quipá/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/projetos\/projeto-quipa$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Quipá')
})

test('portfolio filters by practice area', async ({ page }) => {
  await page.goto('/projetos')
  const all = await page.locator('article').count()
  await page.getByRole('button', { name: 'Patrimônio cultural e pesquisa' }).click()
  await expect(
    page.getByRole('button', { name: 'Patrimônio cultural e pesquisa' }),
  ).toHaveAttribute('aria-pressed', 'true')
  const filtered = await page.locator('article').count()
  expect(filtered).toBeGreaterThan(0)
  expect(filtered).toBeLessThan(all)
})

test('gallery lightbox opens and navigates with keyboard', async ({ page }) => {
  await page.goto('/projetos/programa-de-educacao-patrimonial')
  const firstTile = page.getByRole('button', { name: /Ampliar imagem/ }).first()
  await firstTile.click()
  const dialog = page.getByRole('dialog', { name: /Imagem \d+ de/ })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('1 /')
  await page.keyboard.press('ArrowRight')
  await expect(dialog).toContainText('2 /')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  // Focus returns to the image that opened the viewer.
  await expect(firstTile).toBeFocused()
})

test('skip link moves focus to main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation checked on desktop')
  await page.goto('/sobre')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
})
