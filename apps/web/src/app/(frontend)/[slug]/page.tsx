import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { notFound } from 'next/navigation'

import { docPath, HOME_SLUG, NEWS_SLUG } from '@/lib/urls'
import { docMetadata, loadDoc, staticParams } from '@/server/page'
import { getTexts, hasPublishedNews } from '@/server/queries'
import { breadcrumbJsonLd } from '@/server/seo'

export const generateStaticParams = staticParams

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return docMetadata('pages', (await params).slug)
}

/**
 * Every CMS page, including the home: next.config rewrites "/" to /inicio (and redirects /inicio to "/"),
 * so the home is rendered on first request and cached like the others; the build never needs the database.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params
  const isHome = slug === HOME_SLUG
  if (slug === NEWS_SLUG && !(await hasPublishedNews())) notFound()
  const [page, t] = await Promise.all([loadDoc('pages', slug), getTexts()])
  const path = docPath('pages', slug)
  if (isHome) return <RenderBlocks blocks={page.layout} ctx={{ path, title: page.title, isHome }} />
  return (
    <>
      <RenderBlocks blocks={page.layout} ctx={{ path, title: page.title, isHome }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.home, path: '/' },
          { name: page.title, path },
        ])}
      />
    </>
  )
}
