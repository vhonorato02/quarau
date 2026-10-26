'use client'

import { useEffect } from 'react'

import { useErrorTexts } from '@/components/site/ErrorTexts'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useErrorTexts()
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN)
      void import('@sentry/nextjs').then((S) => S.captureException(error))
  }, [error])
  if (!t) return null
  return (
    <section className="q-wrap q-lost">
      <h1>{t.title}</h1>
      <p className="q-lead">{t.text}</p>
      <ul>
        <li>
          <button type="button" className="q-btn" onClick={reset}>
            {t.retry}
          </button>
        </li>
      </ul>
    </section>
  )
}
