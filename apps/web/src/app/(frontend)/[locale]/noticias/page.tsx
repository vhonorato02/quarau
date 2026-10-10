import { Container } from '@quarau/ui'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { NewsCard } from '@/components/news/NewsCard'
import { PageHeader } from '@/components/PageHeader'
import type { Locale } from '@/i18n/routing'
import { getGlobal, listDocs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/noticias'>): Promise<Metadata> {
  const { locale } = await params
  const settings = await getGlobal('site-settings', locale as Locale).catch(() => null)
  return buildMetadata({
    title: 'Notícias',
    description: 'Novidades, artigos e publicações da Quarau.',
    path: '/noticias',
    locale: locale as Locale,
    settings,
  })
}

export default async function NewsPage({ params }: PageProps<'/[locale]/noticias'>) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('news')
  const news = await listDocs('news', {
    locale: locale as Locale,
    sort: '-publishedAt',
    depth: 1,
    limit: 60,
  })
  return (
    <>
      <PageHeader
        eyebrow="Conteúdo"
        title={t('title')}
        crumbs={[{ label: 'Início', href: '/' }, { label: t('title') }]}
      />
      <section className="pb-(--spacing-section)">
        <Container>
          {news.length ? (
            <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <li key={n.id} data-reveal>
                  <NewsCard item={n} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lead text-ink-muted max-w-xl">{t('empty')}</p>
          )}
        </Container>
      </section>
    </>
  )
}
