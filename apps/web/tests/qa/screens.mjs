/**
 * QA visual: percorre as rotas como um visitante (rolando a página) e salva capturas + relatório.
 *
 *   pnpm --filter @quarau/web exec node tests/qa/screens.mjs https://quarau.vercel.app [saida]
 *
 * - Desktop 1440×900 e celular 390×844, com consentimento de cookies já respondido.
 * - Para cada rota: uma captura por "tela" ao rolar (o que a pessoa realmente vê) e um
 *   relatório com status HTTP, erros de console, imagens quebradas e rolagem horizontal.
 * - Rotas: as do sitemap.xml + busca + 404.
 * - Para cada rota e tela, uma folha-resumo `folha-<tela>-<rota>.jpg` com todas as capturas reduzidas lado a lado:
 *   olhe as folhas primeiro (1 imagem por página, barato) e abra a captura cheia só onde houver suspeita.
 * Saída padrão: test-results/qa/<data>/ (fora do git). Copie as relevantes para docs/qa/.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from '@playwright/test'
import sharp from 'sharp'

/** Puts a page's frames side by side, scaled down, in one JPEG (cheap to review). */
async function contactSheet(files, target, frameWidth) {
  if (!files.length) return
  const frames = await Promise.all(
    files.map((f) => sharp(f).resize({ width: frameWidth }).toBuffer({ resolveWithObject: true })),
  )
  const cols = Math.min(frames.length, frameWidth > 300 ? 4 : 8)
  const h = Math.max(...frames.map((f) => f.info.height))
  const rows = Math.ceil(frames.length / cols)
  await sharp({
    create: {
      width: cols * (frameWidth + 6),
      height: rows * (h + 6),
      channels: 3,
      background: '#d946ef',
    },
  })
    .composite(
      frames.map((f, i) => ({
        input: f.data,
        left: (i % cols) * (frameWidth + 6),
        top: Math.floor(i / cols) * (h + 6),
      })),
    )
    .jpeg({ quality: 70 })
    .toFile(target)
}

const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const out = path.resolve(
  process.argv[3] ?? `test-results/qa/${new Date().toISOString().slice(0, 10)}`,
)
await mkdir(out, { recursive: true })

const sitemap = await fetch(`${base}/sitemap.xml`).then((r) => r.text())
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
routes.push('/busca?q=museu', '/pagina-que-nao-existe')

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]
// PW_CHROMIUM_PATH: usar um Chromium já instalado em vez do baixado por `playwright install`.
const browser = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
)
const report = []
for (const [name, viewport] of viewports) {
  const mobile = name === 'mobile'
  const ctx = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile })
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('quarau-consent-v1', 'denied')
    } catch {
      /* storage bloqueado: o banner aparece, sem problema */
    }
  })
  for (const route of routes) {
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)))
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message.slice(0, 200)}`))
    const slug = route.replace(/[/?=&]+/g, '_').replace(/^_|_$/g, '') || 'home'
    try {
      const res = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 90_000 })
      await page.waitForTimeout(1000)
      const height = await page.evaluate(() => document.body.scrollHeight)
      let frame = 0
      const shots = []
      for (let y = 0; y < height && frame < 20; y += viewport.height - 100) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
        await page.waitForTimeout(700)
        const shot = `${out}/${name}-${slug}-${String(frame++).padStart(2, '0')}.png`
        await page.screenshot({ path: shot, timeout: 60_000 })
        shots.push(shot)
      }
      await contactSheet(shots, `${out}/folha-${name}-${slug}.jpg`, mobile ? 195 : 480)
      const info = await page.evaluate(() => ({
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: [...document.images]
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.currentSrc || i.src),
        title: document.title,
      }))
      report.push({
        viewport: name,
        route,
        status: res?.status(),
        height,
        frames: frame,
        ...info,
        errors,
      })
    } catch (err) {
      report.push({
        viewport: name,
        route,
        status: 0,
        overflowX: false,
        brokenImages: [],
        errors: [...errors, String(err).slice(0, 300)],
      })
    }
    await page.close()
  }
  await ctx.close()
}
await browser.close()
await writeFile(`${out}/relatorio.json`, JSON.stringify(report, null, 2))
const problems = report.filter(
  (r) =>
    (r.status !== 200 && r.route !== '/pagina-que-nao-existe') ||
    r.overflowX ||
    r.brokenImages.length ||
    r.errors.some((e) => !/404 \(Not Found\)/.test(e)),
)
console.info(`${report.length} páginas · ${problems.length} com problema · capturas em ${out}`)
for (const p of problems) console.info(JSON.stringify(p))
process.exit(problems.length ? 1 : 0)
