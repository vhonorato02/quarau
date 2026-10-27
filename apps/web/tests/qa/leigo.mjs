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
// 4. Abertura de página
await page
  .getByRole('button', { name: /adicionar (bloco|layout)/i })
  .first()
  .click()
await shot('escolher-bloco')
await page.getByText('Abertura de página', { exact: true }).click()
await page
  .getByLabel(/^Título/)
  .nth(1)
  .fill('Como trabalhamos em cada território')
await page
  .getByLabel(/^Texto de apresentação/)
  .first()
  .fill('Uma página criada do zero pelo painel, sem tocar em código.')
await shot('bloco-abertura')
// 5. Bloco de texto
await page
  .getByRole('button', { name: /adicionar (bloco|layout)/i })
  .last()
  .click()
await page.getByText('Texto', { exact: true }).first().click()
const editor = page.locator('[contenteditable="true"]').last()
await editor.click()
await editor.pressSequentially(
  'Primeiro diagnosticamos o território; depois desenhamos o projeto com quem vive nele.',
)
await shot('bloco-texto')
// 6. Publicar
await page
  .getByRole('button', { name: /^Publicar/ })
  .first()
  .click()
await expect(page.getByText(/publicad|sucesso/i).first()).toBeVisible({ timeout: 30_000 })
await shot('publicado')
const slug = await page.getByLabel(/Endereço \(slug\)/).inputValue()
// 7. Ver no site
const site = await browser.newPage({ viewport: { width: 390, height: 844 } })
await site.goto(`${base}/${slug}`)
await expect(
  site.getByRole('heading', { level: 1, name: 'Como trabalhamos em cada território' }),
).toBeVisible({ timeout: 30_000 })
await site.screenshot({
  path: path.join(out, `${String(++n).padStart(2, '0')}-site-celular.jpg`),
  type: 'jpeg',
  quality: 70,
  fullPage: true,
})
console.log('📸', n, 'site-celular')
// 8. Editar e publicar de novo
await page
  .getByLabel(/^Título/)
  .nth(1)
  .fill('Como trabalhamos em cada território (editado)')
await page
  .getByRole('button', { name: /^Publicar/ })
  .first()
  .click()
await expect(page.getByText(/publicad|sucesso/i).first()).toBeVisible({ timeout: 30_000 })
await expect
  .poll(
    async () => {
      await site.reload()
      return site.getByRole('heading', { level: 1 }).innerText()
    },
    { timeout: 30_000 },
  )
  .toContain('(editado)')
await site.screenshot({
  path: path.join(out, `${String(++n).padStart(2, '0')}-site-editado.jpg`),
  type: 'jpeg',
  quality: 70,
})
console.log('📸', n, 'site-editado')
// 9. Limpeza: apagar a página de teste
await page
  .getByRole('button', { name: /mais opções|more options/i })
  .first()
  .click()
  .catch(() => {})
console.log('OK', `${base}/${slug}`)
await browser.close()
