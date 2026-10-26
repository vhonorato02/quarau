import { describe, expect, it } from 'vitest'

import urlMap from '../../../../content/legacy/url-map.json'
import {
  legacyRedirects,
  matchRedirect,
  normalizePath,
  resolveRedirectTarget,
} from '@/lib/redirects'

describe('normalizePath', () => {
  it('ignores trailing slashes, query and duplicated slashes', () => {
    expect(normalizePath('/sobre-a-quarau/')).toBe('/sobre-a-quarau')
    expect(normalizePath('/sobre-a-quarau?x=1')).toBe('/sobre-a-quarau')
    expect(normalizePath('//contato//')).toBe('/contato')
    expect(normalizePath('/')).toBe('/')
  })
  it('decodes percent-encoding', () => {
    expect(normalizePath('/projetos/%C3%A1rea')).toBe('/projetos/área')
  })
})

describe('matchRedirect', () => {
  const rules = [
    { from: '/antigo/', to: '/projetos/novo', type: '301' as const },
    { from: '/loop', to: '/loop', type: '301' as const },
  ]
  it('matches with or without the trailing slash', () => {
    expect(matchRedirect('/antigo', rules)?.to).toBe('/projetos/novo')
    expect(matchRedirect('/antigo/', rules)?.to).toBe('/projetos/novo')
  })
  it('never returns a redirect to the same address', () => {
    expect(matchRedirect('/loop', rules)).toBeNull()
  })
  it('returns null when nothing matches', () => {
    expect(matchRedirect('/nada', rules)).toBeNull()
  })
})

describe('resolveRedirectTarget (CMS redirects)', () => {
  it('points a reference to the public address of the document', () => {
    expect(
      resolveRedirectTarget({
        type: 'reference',
        reference: { relationTo: 'projects', value: { slug: 'projeto-quipa' } },
      }),
    ).toBe('/projetos/projeto-quipa')
    expect(
      resolveRedirectTarget({
        type: 'reference',
        reference: { relationTo: 'pages', value: { slug: 'inicio' } },
      }),
    ).toBe('/')
  })
  it('accepts custom internal or https addresses only', () => {
    expect(resolveRedirectTarget({ type: 'custom', url: '/contato' })).toBe('/contato')
    expect(resolveRedirectTarget({ type: 'custom', url: 'https://exemplo.org/x' })).toBe(
      'https://exemplo.org/x',
    )
    expect(resolveRedirectTarget({ type: 'custom', url: 'javascript:alert(1)' })).toBeNull()
  })
  it('ignores a reference whose document was not loaded', () => {
    expect(
      resolveRedirectTarget({ type: 'reference', reference: { relationTo: 'pages', value: 3 } }),
    ).toBeNull()
  })
})

describe('legacy WordPress addresses', () => {
  const rules = legacyRedirects()
  it('covers every URL of the old site map with a permanent redirect', () => {
    for (const r of urlMap.redirects) {
      if (normalizePath(r.from) === normalizePath(r.to)) {
        expect(rules.some((x) => x.destination === x.source)).toBe(false)
        continue
      }
      const hit = rules.find((x) => x.source === normalizePath(r.from))
      expect(hit, r.from).toBeDefined()
      expect(hit!.permanent).toBe(true)
    }
  })
  it('only sends visitors to routes that exist in the new site', () => {
    const known = /^\/($|sobre$|contato$|projetos(\/[a-z0-9-]+)?$|admin$|sitemap\.xml$)/
    for (const r of rules) expect(r.destination, r.source).toMatch(known)
  })
  it('answers both with and without the trailing slash', () => {
    const sources = rules.map((r) => r.source)
    expect(sources).toContain('/sobre-a-quarau')
    expect(sources).toContain('/sobre-a-quarau/')
  })
})
