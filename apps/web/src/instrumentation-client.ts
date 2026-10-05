// Browser error tracking — loaded only when a DSN is configured at build time,
// so it adds nothing to the bundle otherwise.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  void import('@sentry/nextjs').then((Sentry) =>
    Sentry.init({ dsn, tracesSampleRate: 0, replaysSessionSampleRate: 0 }),
  )
}

export {}
