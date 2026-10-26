/**
 * Server observability bootstrap (Next.js instrumentation hook).
 * Error tracking via the Sentry SDK (free tier, or self-hosted GlitchTip) when SENTRY_DSN is set.
 */
import type { captureRequestError } from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.SENTRY_DSN) {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SITE_NOINDEX === 'false' ? 'production' : 'staging',
      release: process.env.APP_VERSION,
      tracesSampleRate: 0.05,
    })
  }
}

export async function onRequestError(...args: Parameters<typeof captureRequestError>) {
  if (!process.env.SENTRY_DSN) return
  const Sentry = await import('@sentry/nextjs')
  Sentry.captureRequestError(...args)
}
