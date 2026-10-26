import { expect, test } from './fixtures'

const PAGES = ['/', '/projetos', '/projetos/projeto-quipa', '/sobre', '/contato']

for (const path of PAGES) {
  test(`visual ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${path.replace(/\//g, '_') || 'home'}.png`, {
      fullPage: true,
      mask: [page.locator('video'), page.locator('canvas')],
    })
  })
}
