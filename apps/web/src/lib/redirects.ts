import urlMap from '../../../../content/legacy/url-map.json'
import { docPath, isRoutable } from './urls'

export type Rule = { from: string; to: string; type: '301' | '302' }

/** "/Sobre-a-Quarau/?x=1" → "/Sobre-a-Quarau": the form used to compare addresses. */
export function normalizePath(input: string): string {
  const path = input.split(/[?#]/)[0] ?? '/'
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    /* keep raw */
  }
  const clean = decoded.replace(/\/{2,}/g, '/').replace(/\/+$/, '')
  return clean === '' ? '/' : clean.startsWith('/') ? clean : `/${clean}`
}

export function matchRedirect<R extends Rule>(pathname: string, rules: R[]): R | null {
  const path = normalizePath(pathname)
  for (const rule of rules) {
    if (normalizePath(rule.from) !== path) continue
    if (normalizePath(rule.to) === path) return null
    return rule
  }
  return null
}

type RedirectTo = {
  type?: 'reference' | 'custom' | null
  url?: string | null
  reference?: { relationTo: string; value: number | string | { slug?: string | null } } | null
}

/** Destination of a redirect created in the CMS (plugin-redirects shape). */
export function resolveRedirectTarget(to: RedirectTo | null | undefined): string | null {
  if (!to) return null
  if (to.type === 'reference') {
    const ref = to.reference
    if (!ref || typeof ref.value !== 'object' || !ref.value?.slug || !isRoutable(ref.relationTo))
      return null
    return docPath(ref.relationTo, ref.value.slug)
  }
  const url = to.url?.trim()
  if (!url) return null
  return /^(\/(?!\/)|https:\/\/)/.test(url) ? url : null
}

/** Old WordPress addresses → new routes, as next.config redirects (both with and without "/"). */
export function legacyRedirects(): Array<{ source: string; destination: string; permanent: true }> {
  const fixed = urlMap.redirects.map((r) => ({ from: r.from, to: r.to }))
  const sitemaps = urlMap.patterns
    .filter((p) => p.to === '/sitemap.xml')
    .map((p) => ({ from: p.from, to: p.to }))
  return [...fixed, ...sitemaps].flatMap(({ from, to }) => {
    const source = normalizePath(from)
    const variants = source === '/' || /\.\w+$/.test(source) ? [source] : [source, `${source}/`]
    return (
      variants
        // Same page (only the final "/" differs): Next.js already removes the slash, a rule would loop.
        .filter((s) => normalizePath(s) !== normalizePath(to))
        .map((s) => ({ source: s, destination: to, permanent: true as const }))
    )
  })
}
