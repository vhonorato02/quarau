/**
 * Mede cada URL como celular: JS transferido (o que o navegador baixa para a página), peso total,
 * violações do axe (WCAG 2.2 AA) e rolagem horizontal. Saída: JSON em <saida>.
 *   node tools/qa/measure.mjs <saida.json> <url> [...]
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('apps/web/package.json'))
const { chromium, devices } = require('@playwright/test')
const { AxeBuilder } = require('@axe-core/playwright')

const [out, ...urls] = process.argv.slice(2)
const browser = await chromium.launch()
const results = []
for (const url of urls) {
  const ctx = await browser.newContext({
    ...devices['Pixel 7'],
    viewport: { width: 390, height: 844 },
  })
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('quarau-consent', JSON.stringify({ analytics: false, v: 1 }))
    } catch {}
  })
  const page = await ctx.newPage()
  let js = 0
  let total = 0
  page.on('response', async (res) => {
    try {
      const len = Number(res.headers()['content-length'] ?? (await res.body()).length)
      total += len
      if (res.request().resourceType() === 'script') js += len
    } catch {}
  })
  const res = await page.goto(url, { waitUntil: 'networkidle' })
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  const hscroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  )
  results.push({
    url,
    status: res?.status(),
    jsKB: Math.round(js / 1024),
    totalKB: Math.round(total / 1024),
    axe: axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
    horizontalScroll: hscroll,
  })
  console.log(url, Math.round(js / 1024), 'KB JS', axe.violations.length, 'axe')
  await ctx.close()
}
await browser.close()
await writeFile(out, JSON.stringify(results, null, 2))
