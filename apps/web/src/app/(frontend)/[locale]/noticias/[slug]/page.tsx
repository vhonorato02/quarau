import { Breadcrumbs, Container } from '@quarau/ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { JsonLd } from '@/components/JsonLd'
import { Media, mediaUrl } from '@/components/Media'
import { formatDate } from '@/components/news/NewsCard'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/i18n/routing'
import { applyCmsRedirect } from '@/lib/page-helpers'
import { getDocBySlug, getGlobal } from '@/lib/queries'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { absoluteUrl, docPath } from '@/lib/urls'

export function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/noticias/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const [n, settings] = await Promise.all([
    getDocBySlug('news', slug, locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  if (!n) return {}
  return buildMetadata({
    title: n.title,
    description: n.summary,
    path: docPath('news', slug),
    meta: n.meta,
    image: n.coverImage,
    type: 'article',
    publishedTime: n.publishedAt,
    locale: locale as Locale,
    settings,
  })
}

export default async function NewsArticle({ params }: PageProps<'/[locale]/noticias/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const n = await getDocBySlug('news', slug, locale as Locale)
  if (!n) {
    await applyCmsRedirect(`/noticias/${slug}`)
    notFound()
  }
  const author = typeof n.createdBy === 'object' ? n.createdBy?.name : null
  return (
    <article className="pt-[calc(var(--header-h)+clamp(2.5rem,6vw,5rem))]">
      <Container className="flex max-w-5xl flex-col gap-8">
        <Breadcrumbs
          items={[
            { label: 'Início', href: '/' },
            { label: 'Notícias', href: '/noticias' },
            { label: n.title },
          ]}
          className="text-ink-muted"
          renderLink={(c, children) => <Link href={c.href ?? '/'}>{children}</Link>}
        />
        <time dateTime={n.publishedAt ?? undefined} className="text-ink-muted">
          {formatDate(n.publishedAt)}
        </time>
        <h1 className="text-h1 font-semibold text-balance">{n.title}</h1>
        {n.summary ? <p className="text-lead text-ink-muted">{n.summary}</p> : null}
      </Container>
      <Container className="my-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Media media={n.coverImage} fill priority sizes="100vw" />
        </div>
      </Container>
      <Container className="flex justify-center pb-(--spacing-section)">
        <RichText data={n.body} className="text-[1.125rem] leading-[1.75]" />
      </Container>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Notícias', path: '/noticias' },
            { name: n.title, path: docPath('news', slug) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: n.title,
            description: n.summary ?? undefined,
            datePublished: n.publishedAt ?? undefined,
            dateModified: n.updatedAt,
            image: mediaUrl(n.coverImage, 'og')
              ? [absoluteUrl(mediaUrl(n.coverImage, 'og')!)]
              : undefined,
            author: author
              ? { '@type': 'Person', name: author }
              : { '@id': `${absoluteUrl('/')}#organization` },
            publisher: { '@id': `${absoluteUrl('/')}#organization` },
            mainEntityOfPage: absoluteUrl(docPath('news', slug)),
          },
        ]}
      />
    </article>
  )
}
