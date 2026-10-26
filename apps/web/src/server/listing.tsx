import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import { docPath } from '@/lib/urls'
import { docMetadata, loadDoc } from '@/server/page'
import { getTexts } from '@/server/queries'
import { breadcrumbJsonLd } from '@/server/seo'

/** A CMS page rendered at a fixed address that also has children (/projetos, /atuacao, /noticias). */
export function listingPage(slug: string) {
  async function generateMetadata(): Promise<Metadata> {
    return docMetadata('pages', slug)
  }
  async function ListingPage() {
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
  return { generateMetadata, ListingPage }
}
