'use client'

import Link from 'next/link'
import { useEffect, useId, useState } from 'react'

import {
  type AnalyticsConfig,
  analyticsFromEnv,
  loadAnalytics,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from './consent'

type Texts = {
  title: string
  text: string
  accept: string
  reject: string
  customize: string
  save: string
  essential: string
  essentialHelp: string
  analytics: string
  analyticsHelp: string
  policy: string
}

/**
 * LGPD consent with real granularity: no measurement script is requested before "Aceitar".
 * Only shown when an analytics provider is configured; essential storage needs no consent.
 */
export function CookieConsent({
  texts,
  privacyHref,
}: {
  texts: Texts
  privacyHref: string | null
}) {
  const [cfg] = useState<AnalyticsConfig>(analyticsFromEnv)
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const id = useId()

  useEffect(() => {
    if (!cfg) return
    const c = readConsent()
    if (c?.analytics) loadAnalytics(cfg)
    if (!c) setOpen(true)
    const reopen = () => {
      setAnalytics(readConsent()?.analytics ?? false)
      setCustom(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [cfg])

  if (!cfg || !open) return null

  const decide = (value: boolean) => {
    saveConsent(value)
    if (value) loadAnalytics(cfg)
    setOpen(false)
  }

  return (
    <section className="q-cookie" aria-labelledby={`${id}-t`}>
      <div className="q-wrap q-cookie__in">
        <div>
          <h2 id={`${id}-t`}>{texts.title}</h2>
          <p>
            {texts.text}{' '}
            {privacyHref ? (
              <Link className="q-link" href={privacyHref}>
                {texts.policy}
              </Link>
            ) : null}
          </p>
          {custom ? (
            <fieldset className="mt-3">
              <label className="q-check">
                <input type="checkbox" checked disabled />
                <span>
                  {texts.essential}
                  <small>{texts.essentialHelp}</small>
                </span>
              </label>
              <label className="q-check">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>
                  {texts.analytics}
                  <small>{texts.analyticsHelp}</small>
                </span>
              </label>
            </fieldset>
          ) : null}
        </div>
        <div className="q-cookie__actions">
          {custom ? (
            <button type="button" className="q-btn" onClick={() => decide(analytics)}>
              {texts.save}
            </button>
          ) : (
            <>
              <button type="button" className="q-btn" onClick={() => decide(true)}>
                {texts.accept}
              </button>
              <button type="button" className="q-btn q-btn--ghost" onClick={() => decide(false)}>
                {texts.reject}
              </button>
              <button type="button" className="q-btn q-btn--ghost" onClick={() => setCustom(true)}>
                {texts.customize}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/** Footer link that reopens the choices. Hidden when no analytics is configured. */
export function CookiePreferencesButton({ label }: { label: string }) {
  if (!process.env.NEXT_PUBLIC_ANALYTICS) return null
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {label}
    </button>
  )
}
