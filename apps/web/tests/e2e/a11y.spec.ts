import AxeBuilder from '@axe-core/playwright'

import { expect, test } from './fixtures'

const PAGES = [
  '/',
  '/sobre',
  '/contato',
  '/projetos',
  '/projetos/projeto-quipa',
  '/atuacao',
  '/busca?q=patrimonio',
  '/pagina-inexistente',
]

for (const path of PAGES) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      // Next.js dev overlay / third-party iframes are not part of the site.
      .exclude('nextjs-portal')
      .analyze()
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.nodes.length}× ${v.nodes[0]?.target.join(' ')}`,
    )
    expect(summary, summary.join('\n')).toEqual([])
  })
}
