import { notFound } from 'next/navigation'

import { applyCmsRedirect } from '@/lib/page-helpers'

/** Unknown multi-segment URLs: try CMS redirects, then render the localized 404. */
export default async function CatchAll({ params }: PageProps<'/[locale]/[...rest]'>) {
  const { rest } = await params
  await applyCmsRedirect(`/${rest.join('/')}`)
  notFound()
}
