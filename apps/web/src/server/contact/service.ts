import {
  contactSchema,
  type ContactErrorKey,
  type ContactInput,
  type ContactState,
} from '../../lib/contact-schema'
import type { RateLimiter } from '../rate-limit'

export type LeadData = {
  name: string
  email: string
  phone?: string
  organization?: string
  subject?: string
  message: string
  status: 'new'
  meta: { consent: true; sourcePath?: string; ipHash: string; userAgent: string }
}

export type ContactDeps = {
  rateLimiter: RateLimiter
  verifyHuman: (token: string | null, ip: string) => Promise<boolean>
  storeLead: (data: LeadData) => Promise<{ id: number | string }>
  markDelivered: (id: number | string) => Promise<void>
  /** E-mails the team (and confirms to the visitor). Best effort: the lead is already stored. */
  notify: (lead: LeadData & { id: number | string }) => Promise<void>
  hashIp: (ip: string) => string
  onError: (err: unknown, context: string) => void
}

export type ContactContext = { ip: string; userAgent: string; turnstileToken: string | null }

const LIMITS = [
  { suffix: 'm', limit: 3, windowSec: 60 },
  { suffix: 'd', limit: 20, windowSec: 86_400 },
] as const

const KNOWN: ContactErrorKey[] = ['required', 'emailInvalid', 'messageShort', 'consentRequired']

/**
 * Contact form use case: validate → anti-abuse (honeypot, rate limit, Turnstile) → store → notify.
 * Pure orchestration; I/O comes in through `deps` (tests/unit/contact.test.ts).
 */
export async function handleContact(
  raw: Record<string, unknown>,
  ctx: ContactContext,
  deps: ContactDeps,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, ContactErrorKey>> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form') as keyof ContactInput
      const msg = KNOWN.includes(issue.message as ContactErrorKey)
        ? (issue.message as ContactErrorKey)
        : 'required'
      fieldErrors[key] ??= msg
    }
    if (fieldErrors.website) return { status: 'success' }
    return { status: 'error', code: 'invalid', fieldErrors }
  }
  const data = parsed.data
  const ipHash = deps.hashIp(ctx.ip)

  for (const { suffix, limit, windowSec } of LIMITS) {
    const res = await deps.rateLimiter.hit(`contact:${suffix}:${ipHash}`, limit, windowSec)
    if (!res.ok) return { status: 'error', code: 'rateLimited' }
  }
  if (!(await deps.verifyHuman(ctx.turnstileToken, ctx.ip)))
    return { status: 'error', code: 'captcha' }

  const lead: LeadData = {
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    organization: data.organization || undefined,
    subject: data.subject || undefined,
    message: data.message,
    status: 'new',
    meta: {
      consent: true,
      sourcePath: data.sourcePath,
      ipHash,
      userAgent: ctx.userAgent.slice(0, 300),
    },
  }

  let id: number | string
  try {
    ;({ id } = await deps.storeLead(lead))
  } catch (err) {
    deps.onError(err, 'contact: lead not stored')
    return { status: 'error', code: 'server' }
  }

  try {
    await deps.notify({ ...lead, id })
    await deps.markDelivered(id)
  } catch (err) {
    deps.onError(err, 'contact: e-mail not delivered')
  }
  return { status: 'success' }
}
