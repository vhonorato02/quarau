import { describe, expect, it } from 'vitest'

import { buildRobots, buildSitemap, type SitemapDoc } from '@/lib/sitemap'

const site = 'https://quarau.com.br'
const docs: SitemapDoc[] = [
  { collection: 'pages', slug: 'inicio', updatedAt: '2026-10-01T10:00:00.000Z' },
  { collection: 'pages', slug: 'sobre', updatedAt: '2026-10-02T10:00:00.000Z' },
  { collection: 'pages', slug: 'noticias', updatedAt: '2026-10-02T10:00:00.000Z' },
  { collection: 'projects', slug: 'projeto-quipa', updatedAt: '2026-10-03T10:00:00.000Z' },
  {
    collection: 'services',
    slug: 'patrimonio-cultural-e-pesquisa',
    updatedAt: '2026-10-03T10:00:00.000Z',
  },
  { collection: 'news', slug: 'primeira', updatedAt: '2026-10-04T10:00:00.000Z' },
]

describe('buildSitemap', () => {
  it('lists every public document once, with absolute URLs and the home first', () => {
    const urls = buildSitemap({ siteUrl: site, docs, hasNews: true }).map((e) => e.url)
    expect(urls[0]).toBe('https://quarau.com.br/')
    expect(urls).toEqual(
      expect.arrayContaining([
        'https://quarau.com.br/sobre',
        'https://quarau.com.br/projetos/projeto-quipa',
        'https://quarau.com.br/atuacao/patrimonio-cultural-e-pesquisa',
        'https://quarau.com.br/noticias/primeira',
      ]),
    )
    expect(new Set(urls).size).toBe(urls.length)
  })
  it('hides the news section while no story is published', () => {
    const urls = buildSitemap({
      siteUrl: site,
      docs: docs.filter((d) => d.collection !== 'news'),
      hasNews: false,
    }).map((e) => e.url)
    expect(urls).not.toContain('https://quarau.com.br/noticias')
  })
  it('uses the document update date as lastModified', () => {
    const quipa = buildSitemap({ siteUrl: site, docs, hasNews: true }).find((e) =>
      e.url.endsWith('/projeto-quipa'),
    )
    expect(quipa?.lastModified).toEqual(new Date('2026-10-03T10:00:00.000Z'))
  })
  it('works with a site URL that has a trailing slash', () => {
    expect(buildSitemap({ siteUrl: `${site}/`, docs, hasNews: true })[0]!.url).toBe(
      'https://quarau.com.br/',
    )
  })
})

describe('buildRobots', () => {
  it('blocks everything outside production (SITE_NOINDEX)', () => {
    expect(buildRobots({ siteUrl: site, noindex: true })).toEqual({
      rules: [{ userAgent: '*', disallow: '/' }],
    })
  })
  it('allows the site, hides the panel and the API, and points to the sitemap', () => {
    const r = buildRobots({ siteUrl: site, noindex: false })
    expect(r.rules).toEqual([
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next', '/busca'] },
    ])
    expect(r.sitemap).toBe('https://quarau.com.br/sitemap.xml')
  })
})
