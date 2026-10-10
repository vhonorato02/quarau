'use client'

import { Button } from '@quarau/ui'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import { CONSENT_EVENT, OPEN_PREFS_EVENT, readConsent, writeConsent, type Consent } from './consent'

type Props = {
  umami?: { websiteId?: string | null; scriptUrl?: string | null } | null
  labels: Record<'title' | 'text' | 'accept' | 'reject' | 'learnMore', string>
}

/**
 * LGPD consent banner. Only anonymous, cookieless analytics (Umami) is gated —
 * and it loads only after explicit consent. No third-party trackers.
 */
export function CookieConsent({ umami, labels }: Props) {
  const [consent, setConsent] = useState<Consent | null>(null)
  // Rendered open on the server; a pre-paint script hides it when consent exists.
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const c = readConsent()
    setConsent(c)
    setOpen(c === null)
    const onOpen = () => setOpen(true)
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail)
    window.addEventListener(OPEN_PREFS_EVENT, onOpen)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => {
      window.removeEventListener(OPEN_PREFS_EVENT, onOpen)
      window.removeEventListener(CONSENT_EVENT, onChange)
    }
  }, [])

  const decide = (v: Consent) => {
    writeConsent(v)
    setOpen(false)
  }

  return (
    <>
      {consent === 'granted' && umami?.websiteId ? (
        <Script
          src={umami.scriptUrl || '/stats/script.js'}
          data-website-id={umami.websiteId}
          data-do-not-track="true"
          strategy="lazyOnload"
        />
      ) : null}
      {open ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="consent-banner border-line text-ink shadow-lift fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-xl border bg-white p-6 sm:inset-x-6 sm:bottom-6"
        >
          <h2 id="consent-title" className="text-lg font-semibold">
            {labels.title}
          </h2>
          <p className="text-ink-muted mt-2 text-sm leading-relaxed">
            {labels.text}{' '}
            <Link href="/privacidade" className="text-blue-700 underline underline-offset-2">
              {labels.learnMore}
            </Link>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => decide('granted')}>
              {labels.accept}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => decide('denied')}>
              {labels.reject}
            </Button>
          </div>
        </section>
      ) : null}
    </>
  )
}
