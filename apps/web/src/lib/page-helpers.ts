import 'server-only'

import { permanentRedirect, redirect } from 'next/navigation'

import { getRedirects } from './queries'
import { docPath, type RoutableCollection } from './urls'

/** Applies CMS-managed redirects (Payload redirects plugin) before rendering a 404. */
export async function applyCmsRedirect(path: string): Promise<void> {
  const redirects = await getRedirects().catch(() => [])
  const normalized = path.replace(/\/$/, '') || '/'
  const match = redirects.find((r) => (r.from.replace(/\/$/, '') || '/') === normalized)
  if (!match) return
  let to: string | null = null
  if (match.to?.type === 'reference' && match.to.reference && typeof match.to.reference.value === 'object') {
    to = docPath(match.to.reference.relationTo as RoutableCollection, (match.to.reference.value as { slug?: string }).slug)
  } else if (match.to?.url) {
    to = match.to.url
  }
  if (!to) return
  if (match.type === '302') redirect(to)
  permanentRedirect(to)
}
