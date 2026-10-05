import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { JsonLd } from '@/components/JsonLd'
import type { Locale } from '@/i18n/routing'
import { applyCmsRedirect } from '@/lib/page-helpers'
import { getDocBySlug, getGlobal } from '@/lib/queries'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps<'/[locale]/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const [page, settings] = await Promise.all([
    getDocBySlug('pages', slug, locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  if (!page) return {}
  return buildMetadata({ title: page.title, path: `/${slug}`, meta: page.meta, locale: locale as Locale, settings })
}

export default async function CmsPage({ params }: PageProps<'/[locale]/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (slug === 'inicio') notFound()
  const page = await getDocBySlug('pages', slug, locale as Locale)
  if (!page) {
    await applyCmsRedirect(`/${slug}`)
    notFound()
  }
  return (
    <>
      <RenderBlocks blocks={page.layout} locale={locale as Locale} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: page.title, path: `/${slug}` },
        ])}
      />
    </>
  )
}
