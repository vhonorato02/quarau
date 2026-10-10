export type Consent = 'granted' | 'denied'
const KEY = 'quarau-consent-v1'
export const CONSENT_EVENT = 'quarau:consent'
export const OPEN_PREFS_EVENT = 'quarau:open-consent'

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function writeConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}
