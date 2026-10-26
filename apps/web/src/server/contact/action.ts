'use server'

import { createHash } from 'node:crypto'

import { renderLeadConfirmation, renderLeadNotification } from '@quarau/emails'
import { headers } from 'next/headers'

import type { ContactState } from '../../lib/contact-schema'
import { env } from '../env'
import { logger } from '../logger'
import { getPayload } from '../payload'
import { rateLimiter } from '../rate-limit'
import { verifyTurnstile } from '../turnstile'
import { handleContact, type LeadData } from './service'

/** Server action behind the contact form. All rules live in ./service.ts. */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const h = await headers()
  const ip =
    (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  const token = formData.get('cf-turnstile-response')
  const payload = await getPayload()

  return handleContact(
    Object.fromEntries(formData.entries()),
    {
      ip,
      userAgent: h.get('user-agent') ?? '',
      turnstileToken: typeof token === 'string' ? token : null,
    },
    {
      rateLimiter,
      verifyHuman: verifyTurnstile,
      hashIp: (value) =>
        createHash('sha256').update(`${value}:${env().PAYLOAD_SECRET}`).digest('hex').slice(0, 32),
      storeLead: (data) => payload.create({ collection: 'leads', overrideAccess: true, data }),
      markDelivered: async (id) => {
        await payload.update({
          collection: 'leads',
          id,
          overrideAccess: true,
          data: { meta: { emailDelivered: true } } as never,
        })
      },
      notify: (lead) => notifyTeam(lead),
      onError: (err, context) => logger.error({ err }, context),
    },
  )

  async function notifyTeam(lead: LeadData & { id: number | string }) {
    const contact = await payload.findGlobal({ slug: 'contact', depth: 0 })
    const to = (contact.notificationEmails || contact.email || env().CONTACT_RECIPIENT)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const siteUrl = env().SITE_URL
    const notification = await renderLeadNotification({
      siteUrl,
      adminUrl: `${siteUrl}/admin/collections/leads/${lead.id}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      organization: lead.organization,
      subject: lead.subject,
      message: lead.message,
      sourcePath: lead.meta.sourcePath,
    })
    await payload.sendEmail({
      to,
      replyTo: lead.email,
      subject: `[Site] ${lead.subject || 'Nova mensagem'}: ${lead.name}`,
      html: notification.html,
      text: notification.text,
    })
    const confirmation = await renderLeadConfirmation({ siteUrl, name: lead.name })
    await payload.sendEmail({
      to: lead.email,
      subject: 'Recebemos sua mensagem',
      html: confirmation.html,
      text: confirmation.text,
    })
  }
}
