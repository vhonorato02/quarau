/**
 * Teste "leigo": uma editora cria, edita e publica uma página do zero só pelo painel.
 * Captura cada passo em docs/qa/depois/leigo/. Usuário editor (não admin).
 *   QA_URL=http://localhost:3300 QA_EMAIL=... QA_PASSWORD=... node tests/qa/leigo.mjs
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { chromium, expect } from '@playwright/test'

const base = process.env.QA_URL ?? 'http://localhost:3300'
const out = path.resolve(import.meta.dirname, '../../../../docs/qa/depois/leigo')
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let n = 0
const shot = async (name) => {
  n += 1
  await page.waitForTimeout(400)
  await page.screenshot({
    path: path.join(out, `${String(n).padStart(2, '0')}-${name}.jpg`),
    type: 'jpeg',
    quality: 70,
  })
  console.log('📸', n, name)
}
const step = process.env.QA_STEP ?? 'all'
const title = `Nossa metodologia ${Date.now().toString(36)}`

await page.goto(`${base}/admin/login`)
await page.getByLabel(/e-?mail/i).fill(process.env.QA_EMAIL)
await page.getByLabel(/senha/i).fill(process.env.QA_PASSWORD)
await shot('login')
await page.getByRole('button', { name: /entrar|login/i }).click()
await expect(page.getByRole('heading', { name: /O que você quer fazer hoje/ })).toBeVisible({
  timeout: 60_000,
})
await shot('painel-inicial')
await page.getByRole('link', { name: 'Nova página' }).click()
await page
  .getByLabel(/^Título/)
  .first()
  .fill(title)
await shot('nova-pagina')
if (step === 'explore') {
  await page
    .getByRole('button', { name: /adicionar (bloco|layout)/i })
    .first()
    .click()
  await shot('escolher-bloco')
  await browser.close()
  process.exit(0)
}
