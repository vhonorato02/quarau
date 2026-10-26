import { test as base, expect } from '@playwright/test'

/** Pages migrated from the old site (must always render). */
export const ROUTES = [
  '/',
  '/sobre',
  '/contato',
  '/privacidade',
  '/projetos',
  '/projetos/ecomuseu-dos-campos-de-sao-jose',
  '/projetos/inventario-cultural-e-dossie-de-registro',
  '/projetos/projeto-ecoe-verde',
  '/projetos/projeto-quipa',
  '/projetos/programa-de-educacao-patrimonial',
  '/projetos/memoria-institucional-museu-do-folclore',
  '/atuacao',
  '/atuacao/projetos-socioambientais',
  '/atuacao/patrimonio-cultural-e-pesquisa',
  '/atuacao/educacao-patrimonial-e-ambiental',
  '/atuacao/gestao-e-difusao',
  '/noticias',
  '/trabalhe-conosco',
  '/busca',
]

/** Skips the consent banner so it does not cover content in screenshots/clicks. */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('quarau-consent-v1', 'denied')
      } catch {
        /* ignore */
      }
    })
    await use(page)
  },
})

export { expect }
