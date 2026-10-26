import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { docPath, HOME_SLUG } from '@/lib/urls'
import { docMetadata, loadDoc, notFoundOrRedirect, staticParams } from '@/server/page'
import { getTexts } from '@/server/queries'
import { breadcrumbJsonLd } from '@/server/seo'

export const generateStaticParams = staticParams

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return docMetadata('pages', (await params).slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  // The home page lives at "/" only.
  if (slug === HOME_SLUG) return notFoundOrRedirect(`/${slug}`)
  const [page, t] = await Promise.all([loadDoc('pages', slug), getTexts()])
  const path = docPath('pages', slug)
  return (
    <>
      <RenderBlocks blocks={page.layout} ctx={{ path, title: page.title, isHome: false }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.home, path: '/' },
          { name: page.title, path },
        ])}
      />
    </>
  )
}
