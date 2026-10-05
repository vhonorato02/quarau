import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import type { Locale } from '@/i18n/routing'
import { getDocBySlug, getGlobal } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

import { FallbackHome } from './FallbackHome'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const [page, settings] = await Promise.all([
    getDocBySlug('pages', 'inicio', locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  return {
    ...buildMetadata({
      title: 'Quarau — Projetos Socioambientais, Educativos e Culturais',
      description: settings?.defaultDescription,
      path: '/',
      meta: page?.meta,
      locale: locale as Locale,
      settings,
    }),
    title: { absolute: page?.meta?.title || 'Quarau — Projetos Socioambientais, Educativos e Culturais' },
  }
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale)
  const page = await getDocBySlug('pages', 'inicio', locale as Locale).catch(() => null)
  if (!page?.layout?.length) return <FallbackHome />
  return <RenderBlocks blocks={page.layout} locale={locale as Locale} />
}
