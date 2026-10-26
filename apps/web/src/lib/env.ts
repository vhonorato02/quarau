import { z } from 'zod'

import { databaseUrl, siteUrl } from './platform-env'

/**
 * Server-side environment, validated once at startup. Optional services
 * (Meilisearch, Valkey, SMTP, Turnstile, S3) degrade gracefully when absent so
 * local development and CI work without the full stack.
 */
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SITE_URL: z.url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1).default('postgres://quarau:quarau@localhost:5432/quarau'),
  /** Direct (non-pooled) connection, used for migrations when pgBouncer runs in transaction mode. */
  DATABASE_URL_DIRECT: z.string().optional(),
  PAYLOAD_SECRET: z.string().min(16).default('dev-only-secret-change-me-please'),
  PREVIEW_SECRET: z.string().min(8).default('dev-preview-secret'),
  REVALIDATE_SECRET: z.string().optional(),

  S3_ENDPOINT: z.string().optional(),
  S3_BUCKET: z.string().default('quarau-media'),
  S3_REGION: z.string().default('us-east-1'),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),

  MEILI_HOST: z.string().optional(),
  MEILI_MASTER_KEY: z.string().optional(),
  MEILI_INDEX: z.string().default('quarau_content'),

  REDIS_URL: z.string().optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
  EMAIL_FROM_ADDRESS: z.string().default('nao-responda@quarau.com.br'),
  EMAIL_FROM_NAME: z.string().default('Quarau'),
  CONTACT_RECIPIENT: z.string().default('contato@quarau.com.br'),

  TURNSTILE_SECRET_KEY: z.string().optional(),

  SENTRY_DSN: z.string().optional(),
  /** When "true" the site is served with noindex + robots disallow (staging/temporary domain). */
  SITE_NOINDEX: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),
  ENABLED_LOCALES: z.string().default('pt'),
})

export type Env = z.infer<typeof schema>

let cached: Env | undefined

export function env(): Env {
  if (!cached)
    cached = schema.parse({ ...process.env, SITE_URL: siteUrl(), DATABASE_URL: databaseUrl() })
  return cached
}
