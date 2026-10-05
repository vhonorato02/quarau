/**
 * Server observability bootstrap (Next.js instrumentation hook).
 * - OpenTelemetry traces via @vercel/otel (exported when OTEL_EXPORTER_OTLP_ENDPOINT is set)
 * - Error tracking via Sentry SDK, compatible with self-hosted GlitchTip (when SENTRY_DSN is set)
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  const { registerOTel } = await import('@vercel/otel')
  registerOTel({ serviceName: 'quarau-web' })

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

export async function onRequestError(...args: Parameters<typeof import('@sentry/nextjs').captureRequestError>) {
  if (!process.env.SENTRY_DSN) return
  const Sentry = await import('@sentry/nextjs')
  Sentry.captureRequestError(...args)
}
