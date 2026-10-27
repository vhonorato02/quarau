/**
 * Miniaturas reais dos blocos para o seletor "Adicionar bloco" do painel (apps/web/public/cms-blocos/).
 * Fotografa cada bloco no site rodando, a partir da classe do design system que o representa.
 *   node tools/design/block-thumbs.mjs http://localhost:3300
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('apps/web/package.json'))
const { chromium } = require('@playwright/test')
const sharp = require('sharp')

const base = process.argv[2] ?? 'http://localhost:3300'
const out = path.resolve('apps/web/public/cms-blocos')
const blocks = {
  heroLens: ['/', '.q-hero'],
  partnersStrip: ['/', '.q-partners'],
  projectIndex: ['/', '.q-index'],
  proofNumber: ['/', '.q-proof'],
  cycle: ['/', '.q-cycle'],
  ctaBand: ['/', '.q-cta'],
  pageIntro: ['/sobre', '.q-intro'],
  richText: ['/sobre', '.q-split'],
  areas: ['/atuacao', '.q-areas'],
  mediaText: ['/projetos/projeto-quipa', '.q-mt, .q-story'],
  quote: ['/projetos/projeto-quipa', '.q-quote'],
  figure: ['/projetos/projeto-quipa', '.q-figure'],
  gallery: ['/projetos/projeto-quipa', '.q-mosaic'],
  video: ['/projetos/projeto-quipa', '.q-video'],
  publications: ['/projetos/memoria-institucional-museu-do-folclore', '.q-pubs'],
  ods: ['/projetos/projeto-quipa', '.q-ods'],
  contactForm: ['/contato', '.q-contact-page'],
}
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let current = ''
for (const [slug, [route, selector]] of Object.entries(blocks)) {
  if (route !== current) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' })
    current = route
  }
  const el = page.locator(selector).first()
  if (!(await el.count())) {
    console.log('sem exemplo:', slug)
    continue
  }
  await el.scrollIntoViewIfNeeded()
  await page.evaluate(() =>
    Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => 0)))),
  )
  const box = await el.boundingBox()
  const clip = {
    x: 0,
    y: Math.max(0, box.y - 24),
    width: 1440,
    height: Math.min(900, box.height + 48),
  }
  const buf = await page.screenshot({
    clip: { ...clip, y: clip.y + (await page.evaluate(() => window.scrollY)) },
    fullPage: true,
  })
  await sharp(buf)
    .resize(480, 300, { fit: 'cover', position: 'top' })
    .webp({ quality: 70 })
    .toFile(path.join(out, `${slug}.webp`))
  console.log('ok', slug)
}
await browser.close()
