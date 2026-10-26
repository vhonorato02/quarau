export const CONSENT_KEY = 'quarau-consent'
export const CONSENT_VERSION = 1
export const OPEN_CONSENT_EVENT = 'quarau:open-consent'

export type Consent = { v: number; analytics: boolean; at: string }

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    return c.v === CONSENT_VERSION && typeof c.analytics === 'boolean' ? c : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean): Consent {
  const c: Consent = { v: CONSENT_VERSION, analytics, at: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c))
  } catch {
    /* private mode: the choice lasts for this page view */
  }
  return c
}

export type AnalyticsConfig =
  { provider: 'umami'; src: string; websiteId: string } | { provider: 'vercel' } | null

/** Analytics chosen by environment (none by default). Nothing loads before consent. */
export function analyticsFromEnv(): AnalyticsConfig {
  const p = process.env.NEXT_PUBLIC_ANALYTICS
  if (p === 'vercel') return { provider: 'vercel' }
  if (
    p === 'umami' &&
    process.env.NEXT_PUBLIC_UMAMI_SRC &&
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  )
    return {
      provider: 'umami',
      src: process.env.NEXT_PUBLIC_UMAMI_SRC,
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    }
  return null
}

export function loadAnalytics(cfg: NonNullable<AnalyticsConfig>) {
  if (document.querySelector('script[data-quarau-analytics]')) return
  const s = document.createElement('script')
  s.defer = true
  s.dataset.quarauAnalytics = cfg.provider
  if (cfg.provider === 'umami') {
    s.src = cfg.src
    s.dataset.websiteId = cfg.websiteId
  } else {
    s.src = '/_vercel/insights/script.js'
  }
  document.head.appendChild(s)
}
