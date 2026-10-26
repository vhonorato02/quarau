/**
 * Capturas de página inteira de arquivos HTML ou URLs, em 390 px e 1440 px.
 *   node tools/design/shoot.mjs <saida> <nome=arquivo-ou-url> [...]
 * Gera <saida>/<nome>-390.jpg, <nome>-1440.jpg e uma versão reduzida <nome>-1440-mini.jpg para revisão rápida.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('apps/web/package.json'))
const { chromium } = require('@playwright/test')
const sharp = require('sharp')

const [out, ...targets] = process.argv.slice(2)
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
for (const t of targets) {
  const [name, src] = t.split('=')
  const url = /^https?:/.test(src) ? src : pathToFileURL(path.resolve(src)).href
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 })
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const file = path.join(out, `${name}-${width}.jpg`)
    await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 72 })
    if (width === 1440) await sharp(file).resize({ width: 720 }).jpeg({ quality: 70 }).toFile(path.join(out, `${name}-1440-mini.jpg`))
    await page.close()
    console.log('ok', file)
  }
}
await browser.close()
