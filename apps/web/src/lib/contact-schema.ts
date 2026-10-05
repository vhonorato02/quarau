import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'required').max(120),
  email: z.email('emailInvalid').trim().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  organization: z.string().trim().max(160).optional().or(z.literal('')),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'messageShort').max(5000),
  consent: z.literal('on', { message: 'consentRequired' }),
  sourcePath: z.string().max(300).optional(),
  locale: z.string().max(5).optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      code: 'invalid' | 'rateLimited' | 'captcha' | 'server'
      fieldErrors?: Record<string, string>
    }
