import { expect, ROUTES, test } from './fixtures'

for (const route of ROUTES) {
  test(`renders ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    const res = await page.goto(route)
    expect(res?.status(), `status for ${route}`).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page).toHaveTitle(/Quarau/)
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.locator('footer')).toContainText('contato@quarau.com.br')
    expect(errors, `JS errors on ${route}`).toEqual([])
  })
}

test('unknown page returns branded 404', async ({ page }) => {
  const res = await page.goto('/pagina-que-nao-existe')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: /Página não encontrada/ })).toBeVisible()
})

test('SEO essentials on a project page', async ({ page }) => {
  await page.goto('/projetos/projeto-quipa')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/projetos\/projeto-quipa$/,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/)
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld.join(' ')).toContain('BreadcrumbList')
  expect(ld.join(' ')).toContain('Organization')
})

test('sitemap and robots', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  const xml = await sitemap.text()
  expect(xml).toContain('/projetos/projeto-quipa')
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
})
