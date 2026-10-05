'use server'

import { createHash } from 'node:crypto'

import { renderLeadConfirmation, renderLeadNotification } from '@quarau/emails'
import { headers } from 'next/headers'

import { contactSchema, type ContactState } from '@/lib/contact-schema'
import { env } from '@/lib/env'
import { logger } from '@/lib/logger'
import { getPayload } from '@/lib/payload'
import { rateLimit } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      fieldErrors[key] ??= issue.message === 'Invalid input' ? 'required' : issue.message
    }
    // Honeypot filled: pretend success, store nothing.
    if (fieldErrors.website) return { status: 'success' }
    return { status: 'error', code: 'invalid', fieldErrors }
  }
  const data = parsed.data

  const h = await headers()
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  const ipHash = createHash('sha256').update(`${ip}:${env().PAYLOAD_SECRET}`).digest('hex').slice(0, 32)

  const [perMinute, perDay] = await Promise.all([rateLimit(`contact:m:${ipHash}`, 3, 60), rateLimit(`contact:d:${ipHash}`, 20, 86_400)])
  if (!perMinute.ok || !perDay.ok) return { status: 'error', code: 'rateLimited' }

  const token = formData.get('cf-turnstile-response')
  if (!(await verifyTurnstile(typeof token === 'string' ? token : null, ip))) return { status: 'error', code: 'captcha' }

  try {
    const payload = await getPayload()
    const lead = await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
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
          locale: data.locale,
          ipHash,
          userAgent: (h.get('user-agent') ?? '').slice(0, 300),
        },
      },
    })

    // E-mail notifications are best-effort: the lead is already safely stored.
    let delivered = false
    try {
      const contact = await payload.findGlobal({ slug: 'contact', depth: 0 })
      const to = (contact.notificationEmails || contact.email || env().CONTACT_RECIPIENT)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      const siteUrl = env().SITE_URL
      const notification = await renderLeadNotification({
        siteUrl,
        adminUrl: `${siteUrl}/admin/collections/leads/${lead.id}`,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        organization: data.organization || undefined,
        subject: data.subject || undefined,
        message: data.message,
        sourcePath: data.sourcePath,
      })
      await payload.sendEmail({
        to,
        replyTo: data.email,
        subject: `[Site] ${data.subject || 'Nova mensagem'} — ${data.name}`,
        html: notification.html,
        text: notification.text,
      })
      const confirmation = await renderLeadConfirmation({ siteUrl, name: data.name })
      await payload.sendEmail({
        to: data.email,
        subject: 'Recebemos sua mensagem — Quarau',
        html: confirmation.html,
        text: confirmation.text,
      })
      delivered = true
    } catch (err) {
      logger.error({ err, leadId: lead.id }, 'contact email delivery failed')
    }
    if (delivered) {
      await payload.update({ collection: 'leads', id: lead.id, overrideAccess: true, data: { meta: { ...lead.meta, emailDelivered: true } } })
    }
    return { status: 'success' }
  } catch (err) {
    logger.error({ err }, 'contact submission failed')
    return { status: 'error', code: 'server' }
  }
}
