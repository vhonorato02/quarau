import { z } from 'zod'

/**
 * Contact form contract, validated on the server (the browser only mirrors it).
 * Error messages are keys of "Textos do site → Formulário de contato".
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'required').max(120, 'required'),
  email: z.email('emailInvalid').trim().max(200, 'emailInvalid'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  organization: z.string().trim().max(160).optional().or(z.literal('')),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'messageShort').max(5000, 'messageShort'),
  consent: z.literal('on', { message: 'consentRequired' }),
  sourcePath: z.string().max(300).optional(),
  /** Honeypot: humans never see this field. */
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactErrorKey = 'required' | 'emailInvalid' | 'messageShort' | 'consentRequired'

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      code: 'invalid' | 'rateLimited' | 'captcha' | 'server'
      fieldErrors?: Partial<Record<keyof ContactInput, ContactErrorKey>>
    }
