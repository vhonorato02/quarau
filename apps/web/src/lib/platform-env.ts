/**
 * Values that may come from the hosting platform instead of being set by hand.
 * On Vercel, the production domain and the Postgres URL (Neon/Supabase integrations expose
 * POSTGRES_URL) are injected automatically, so a fresh project needs no manual SITE_URL/DATABASE_URL.
 */
export function siteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return vercelDomain ? `https://${vercelDomain}` : 'http://localhost:3000'
}

export function databaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined
}
