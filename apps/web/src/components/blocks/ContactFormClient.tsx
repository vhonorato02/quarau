'use client'

import { ArrowIcon, Button, Checkbox, Field, Input, Select, Textarea } from '@quarau/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useActionState, useEffect, useRef } from 'react'

import { submitContact } from '@/actions/contact'
import type { ContactState } from '@/lib/contact-schema'

type Labels = Record<
  | 'name'
  | 'email'
  | 'phone'
  | 'organization'
  | 'subject'
  | 'message'
  | 'consent'
  | 'submit'
  | 'sending'
  | 'success'
  | 'error'
  | 'rateLimited'
  | 'invalid'
  | 'required'
  | 'emailInvalid'
  | 'messageShort'
  | 'consentRequired'
  | 'captcha',
  string
>

export function ContactFormClient({
  subjects,
  locale,
  turnstileSiteKey,
  labels,
}: {
  subjects: string[]
  locale: string
  turnstileSiteKey: string | null
  labels: Labels
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: 'idle',
  })
  const pathname = usePathname()
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}
  const msg = (key?: string) => (key ? (labels[key as keyof Labels] ?? labels.required) : undefined)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  const [consentBefore, consentLink = '', consentAfter = ''] =
    labels.consent.split(/<link>|<\/link>/)

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none sm:col-span-2">
        {state.status === 'success' ? (
          <p className="border-success/30 rounded-md border bg-green-50 p-4 font-medium text-green-800">
            {labels.success}
          </p>
        ) : null}
        {state.status === 'error' ? (
          <p
            role="alert"
            className="border-danger/30 text-danger rounded-md border bg-red-50 p-4 font-medium"
          >
            {state.code === 'invalid'
              ? labels.invalid
              : state.code === 'rateLimited'
                ? labels.rateLimited
                : state.code === 'captcha'
                  ? labels.captcha
                  : labels.error}
          </p>
        ) : null}
      </div>

      <Field id="name" label={labels.name} required error={msg(errors.name)}>
        {(p) => <Input {...p} name="name" autoComplete="name" maxLength={120} />}
      </Field>
      <Field id="email" label={labels.email} required error={msg(errors.email)}>
        {(p) => (
          <Input
            {...p}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
          />
        )}
      </Field>
      <Field id="phone" label={labels.phone}>
        {(p) => (
          <Input {...p} name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} />
        )}
      </Field>
      <Field id="organization" label={labels.organization}>
        {(p) => <Input {...p} name="organization" autoComplete="organization" maxLength={160} />}
      </Field>
      <Field id="subject" label={labels.subject} className="sm:col-span-2">
        {(p) =>
          subjects.length ? (
            <Select {...p} name="subject" defaultValue="">
              <option value="">—</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          ) : (
            <Input {...p} name="subject" maxLength={160} />
          )
        }
      </Field>
      <Field
        id="message"
        label={labels.message}
        required
        error={msg(errors.message)}
        className="sm:col-span-2"
      >
        {(p) => <Textarea {...p} name="message" rows={6} maxLength={5000} />}
      </Field>

      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="sourcePath" value={pathname} />
      <input type="hidden" name="locale" value={locale} />

      <div className="sm:col-span-2">
        <Checkbox
          id="consent"
          name="consent"
          required
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          label={
            <>
              {consentBefore}
              <Link href="/privacidade" className="text-blue-700 underline underline-offset-2">
                {consentLink}
              </Link>
              {consentAfter}
            </>
          }
        />
        {errors.consent ? (
          <p id="consent-error" className="text-danger mt-2 text-sm font-medium">
            {labels.consentRequired}
          </p>
        ) : null}
      </div>

      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div
            className="cf-turnstile sm:col-span-2"
            data-sitekey={turnstileSiteKey}
            data-language="pt-br"
          />
        </>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? labels.sending : labels.submit}
          <ArrowIcon />
        </Button>
      </div>
    </form>
  )
}
