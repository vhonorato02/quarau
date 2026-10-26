'use client'

import { OPEN_PREFS_EVENT } from './consent'

export function CookiePreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="hover:text-white hover:underline"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
    >
      {label}
    </button>
  )
}
