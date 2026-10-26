import { z } from 'zod'

import { databaseUrl, siteUrl } from '../lib/platform-env'

const bool = (fallback: 'true' | 'false') =>
  z
    .enum(['true', 'false'])
    .default(fallback)
    .transform((v) => v === 'true')

/**
 * Server environment, validated once. Optional services degrade gracefully when absent
 * (no SMTP → leads only stored; no Turnstile → no captcha; no S3 → local disk).
 * In production the secrets are mandatory. Documented in .env.example.
 */
const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    SITE_URL: z.url(),
    DATABASE_URL: z.string().min(1).optional(),
    PAYLOAD_SECRET: z.string().min(32).optional(),
    CRON_SECRET: z.string().min(16).optional(),
    CONTACT_RECIPIENT: z.string().default('contato@quarau.com.br'),
    TURNSTILE_SECRET_KEY: z.string().optional(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
    SENTRY_DSN: z.string().optional(),
    /** "true" outside production: noindex + robots disallow (staging, temporary domains). */
    SITE_NOINDEX: bool('true'),
  })
  .superRefine((v, ctx) => {
    if (v.NODE_ENV !== 'production') return
    if (!v.PAYLOAD_SECRET)
      ctx.addIssue({ code: 'custom', path: ['PAYLOAD_SECRET'], message: 'obrigatório em produção' })
    if (!v.DATABASE_URL)
      ctx.addIssue({ code: 'custom', path: ['DATABASE_URL'], message: 'obrigatório em produção' })
  })

export type Env = z.infer<typeof schema> & { PAYLOAD_SECRET: string }

let cached: Env | undefined

export function env(): Env {
  if (!cached) {
    const parsed = schema.parse({
      ...process.env,
      SITE_URL: siteUrl(),
      DATABASE_URL: databaseUrl(),
    })
    cached = {
      ...parsed,
      PAYLOAD_SECRET: parsed.PAYLOAD_SECRET ?? 'dev-only-secret-not-for-production',
    }
  }
  return cached
}
