import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { HOME_SLUG } from '@/lib/urls'
import { docMetadata, loadDoc } from '@/server/page'

export function generateMetadata(): Promise<Metadata> {
  return docMetadata('pages', HOME_SLUG)
}

export default async function HomePage() {
  const page = await loadDoc('pages', HOME_SLUG)
  return <RenderBlocks blocks={page.layout} ctx={{ path: '/', title: page.title, isHome: true }} />
}
