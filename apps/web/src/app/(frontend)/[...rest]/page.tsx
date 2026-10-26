import { notFoundOrRedirect } from '@/server/page'

/** Any other address: redirect created in the CMS, or the 404 page. */
export default async function CatchAll({ params }: { params: Promise<{ rest: string[] }> }) {
  const { rest } = await params
  return notFoundOrRedirect(`/${rest.join('/')}`)
}
