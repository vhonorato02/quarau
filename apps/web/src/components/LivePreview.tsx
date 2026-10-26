'use client'

import { lazy, Suspense } from 'react'

const Listener = lazy(() =>
  import('./LivePreviewListener').then((m) => ({ default: m.LivePreviewListener })),
)

/** Rendered only in draft mode; the listener's code is fetched only then. */
export function LivePreview({ serverURL }: { serverURL: string }) {
  return (
    <Suspense fallback={null}>
      <Listener serverURL={serverURL} />
    </Suspense>
  )
}
