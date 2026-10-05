'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Refreshes the page while an editor types in the Payload live preview. */
export function LivePreviewListener({ serverURL }: { serverURL: string }) {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
