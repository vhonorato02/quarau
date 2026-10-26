import { expect, test } from './fixtures'

test('main menu reaches the portfolio and a case study', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Projetos' }).click()
  } else {
    await page
      .getByRole('navigation', { name: 'Menu principal' })
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

test('practice area shows its related projects', async ({ page }) => {
  await page.goto('/projetos')
  const all = await page.locator('main a[href^="/projetos/"]').count()
  await page.goto('/atuacao')
  await page.getByRole('link', { name: /Patrimônio cultural e pesquisa/ }).click()
  await expect(page).toHaveURL(/\/atuacao\/patrimonio-cultural-e-pesquisa$/)
  const related = page.getByRole('region', { name: 'Projetos nesta área' })
  await expect(related).toBeVisible()
  await expect(related.getByRole('link', { name: /Inventário Cultural/ })).toBeVisible()
  const filtered = await related.getByRole('link').count()
  expect(filtered).toBeGreaterThan(0)
  expect(filtered).toBeLessThan(all)
})

test('gallery lightbox opens and navigates with keyboard', async ({ page }) => {
  await page.goto('/projetos/programa-de-educacao-patrimonial')
  const firstTile = page.locator('main button[aria-haspopup="dialog"]').first()
  await firstTile.click()
  const dialog = page.getByRole('dialog', { name: 'Fotos em tela cheia' })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('[aria-live="polite"]')).toHaveText(/^1 de \d+$/)
  const firstImage = await dialog.getByRole('img').getAttribute('src')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('[aria-live="polite"]')).toHaveText(/^2 de \d+$/)
  await expect(dialog.getByRole('img')).not.toHaveAttribute('src', firstImage!)
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
