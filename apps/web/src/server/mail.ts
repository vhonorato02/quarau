import { createTransport, type Transporter } from 'nodemailer'

/**
 * Outgoing e-mail, chosen by environment: any SMTP server (SMTP_HOST), or Resend through its
 * SMTP endpoint (RESEND_API_KEY). With neither, messages are only stored in the CMS.
 */
export function mailTransport(env: NodeJS.ProcessEnv = process.env): Transporter | undefined {
  if (env.SMTP_HOST) {
    return createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT ?? 587),
      secure: env.SMTP_SECURE === 'true',
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  }
  if (env.RESEND_API_KEY) {
    return createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: { user: 'resend', pass: env.RESEND_API_KEY },
    })
  }
  return undefined
}
