'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useActionState, useEffect, useRef, useState } from 'react'

import type { SiteTexts } from '@/cms/globals/site-texts'
import type { ContactInput, ContactState } from '@/lib/contact-schema'
import { submitContact } from '@/server/contact/action'

export type FormTexts = SiteTexts['form']

type FieldName = keyof ContactInput

/**
 * Contact form. Works without JavaScript (server action); with JS it keeps the values,
 * focuses the error summary and announces the result. Every text comes from the CMS.
 */
export function ContactFormClient({
  texts,
  subjects,
  privacyHref,
  turnstileSiteKey,
}: {
  texts: FormTexts
  subjects: string[]
  privacyHref: string | null
  turnstileSiteKey: string | null
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: 'idle',
  })
  const [sent, setSent] = useState(false)
  const pathname = usePathname()
  const status = useRef<HTMLDivElement>(null)
  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  useEffect(() => {
    if (state.status === 'success') setSent(true)
    if (state.status !== 'idle') status.current?.focus()
  }, [state])

  const err = (name: FieldName) => {
    const key = errors[name]
    return key ? texts[key] : null
  }
  const describe = (name: FieldName, help?: boolean) =>
    [help ? `f-${name}-help` : null, errors[name] ? `f-${name}-err` : null]
      .filter(Boolean)
      .join(' ') || undefined
  const fieldError = (name: FieldName) =>
    err(name) ? (
      <p id={`f-${name}-err`} className="q-field__error">
        {err(name)}
      </p>
    ) : null

  if (sent) {
    return (
      <div
        ref={status}
        tabIndex={-1}
        className="q-alert q-alert--success outline-none"
        role="status"
      >
        <h3>{texts.successTitle}</h3>
        <p>{texts.successText}</p>
        <button type="button" className="q-btn q-btn--ghost mt-4" onClick={() => setSent(false)}>
          {texts.sendAnother}
        </button>
      </div>
    )
  }

  const generalError =
    state.status === 'error'
      ? state.code === 'invalid'
        ? texts.errorSummary
        : state.code === 'rateLimited'
          ? texts.rateLimited
          : state.code === 'captcha'
            ? texts.captcha
            : texts.server
      : null

  return (
    <form action={action} noValidate className="q-form" aria-busy={pending}>
      <div ref={status} tabIndex={-1} className="outline-none" aria-live="assertive">
        {generalError ? (
          <p className="q-alert q-alert--error" role="alert">
            {generalError}
          </p>
        ) : null}
      </div>
      <input type="hidden" name="sourcePath" value={pathname ?? '/'} />
      <div className="q-honeypot" aria-hidden="true">
        <label htmlFor="f-website">{texts.name}</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="q-form__row">
        <div className="q-field">
          <label htmlFor="f-name">{texts.name}</label>
          <input
            id="f-name"
            name="name"
            className="q-input"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe('name')}
          />
          {fieldError('name')}
        </div>
        <div className="q-field">
          <label htmlFor="f-email">{texts.email}</label>
          <input
            id="f-email"
            name="email"
            type="email"
            className="q-input"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe('email')}
          />
          {fieldError('email')}
        </div>
      </div>
      <div className="q-form__row">
        <div className="q-field">
          <label htmlFor="f-phone">{texts.phone}</label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            className="q-input"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        <div className="q-field">
          <label htmlFor="f-org">{texts.organization}</label>
          <input id="f-org" name="organization" className="q-input" autoComplete="organization" />
        </div>
      </div>
      {subjects.length ? (
        <div className="q-field">
          <label htmlFor="f-subject">{texts.subject}</label>
          <select id="f-subject" name="subject" className="q-input" defaultValue="">
            <option value="">{texts.subjectPlaceholder}</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="q-field">
        <label htmlFor="f-message">{texts.message}</label>
        <p id="f-message-help" className="q-field__help">
          {texts.messageHelp}
        </p>
        <textarea
          id="f-message"
          name="message"
          className="q-input"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe('message', true)}
        />
        {fieldError('message')}
      </div>
      <div className="q-field">
        <label className="q-check" htmlFor="f-consent">
          <input
            id="f-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describe('consent')}
          />
          <span>
            {`${texts.consent} `}
            {privacyHref ? (
              <Link className="q-link" href={privacyHref}>
                {texts.privacyLink}
              </Link>
            ) : (
              texts.privacyLink
            )}
          </span>
        </label>
        {fieldError('consent')}
        <p className="q-field__help">{texts.legalBasis}</p>
      </div>
      {turnstileSiteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language="pt-br" />
        </>
      ) : null}
      <div>
        <button type="submit" className="q-btn" disabled={pending} aria-busy={pending}>
          {pending ? texts.sending : texts.submit}
        </button>
      </div>
    </form>
  )
}
