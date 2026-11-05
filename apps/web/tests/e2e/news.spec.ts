import { curatedNews } from '../../scripts/seed/news'
import { expect, test } from './fixtures'

test('published news are reachable from the site and the main menu', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Notícias' }).click()
  } else {
    await page
      .getByRole('navigation', { name: 'Menu principal' })
      .getByRole('link', { name: 'Notícias' })
      .click()
  }
  await expect(page).toHaveURL(/\/noticias$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Notícias')

  for (const item of curatedNews) {
    await expect(page.locator(`main a[href="/noticias/${item.slug}"]`)).toBeVisible()
  }
})

for (const item of curatedNews) {
  test(`published and searchable editorial story: ${item.slug}`, async ({ page, request }) => {
    const response = await page.goto(`/noticias/${item.slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.title)
    await expect(page.locator('main')).toContainText(item.summary)
    await expect(page.locator(`main a[href="/projetos/${item.projectSlug}"]`)).toBeVisible()

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBe(true)
    expect(await sitemap.text()).toContain(`/noticias/${item.slug}`)
  })
}
