/**
 * Values that may come from the hosting platform instead of being set by hand.
 * On Vercel, the production domain and the Postgres URL (Neon/Supabase integrations expose
 * POSTGRES_URL) are injected automatically, so a fresh project needs no manual SITE_URL/DATABASE_URL.
 */
export function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  return vercelDomain ? `https://${vercelDomain}` : 'http://localhost:3000'
}

export function databaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined
}

/**
 * Temporary "static media" mode (docs/MIGRACAO-VPS.md): the seeded photos ship inside the deployment
 * and are served by the CDN; uploads and videos stay off until real storage (R2) is configured.
 */
export const mediaStatic = (): boolean =>
  process.env.MEDIA_STATIC === 'true' && !process.env.S3_ENDPOINT
