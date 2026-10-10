import { ArrowIcon, Badge, Button, Container } from '@quarau/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { JsonLd } from '@/components/JsonLd'
import { formatDate } from '@/components/news/NewsCard'
import { PageHeader } from '@/components/PageHeader'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/i18n/routing'
import { siteUrl as resolveSiteUrl } from '@/lib/platform-env'
import { getDocBySlug, getGlobal } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import { lexicalToText } from '@/utilities/lexical'

export function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/trabalhe-conosco/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const [j, settings] = await Promise.all([
    getDocBySlug('jobs', slug, locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  if (!j) return {}
  return buildMetadata({
    title: j.title,
    description: j.summary,
    path: docPath('jobs', slug),
    meta: j.meta,
    locale: locale as Locale,
    settings,
    noindex: j.opening === 'closed',
  })
}

export default async function JobPage({ params }: PageProps<'/[locale]/trabalhe-conosco/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const j = await getDocBySlug('jobs', slug, locale as Locale)
  if (!j) notFound()
  const t = await getTranslations('jobs')
  const open = j.opening === 'open'
  return (
    <>
      <PageHeader
        eyebrow={open ? t('open') : t('closed')}
        title={j.title}
        lead={j.summary}
        crumbs={[
          { label: 'Início', href: '/' },
          { label: t('title'), href: '/trabalhe-conosco' },
          { label: j.title },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {j.location ? <Badge>{j.location}</Badge> : null}
          {j.closingDate ? (
            <Badge>
              {t('closing')} {formatDate(j.closingDate)}
            </Badge>
          ) : null}
        </div>
      </PageHeader>
      <section className="pb-(--spacing-section)">
        <Container className="flex flex-col gap-12">
          <RichText data={j.description} />
          {open ? (
            <Button asChild size="lg" className="self-start">
              <a href={j.applyUrl}>
                {t('apply')}
                <ArrowIcon />
              </a>
            </Button>
          ) : null}
        </Container>
      </section>
      {open ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: j.title,
            description: lexicalToText(j.description),
            datePosted: j.publishedAt ?? j.createdAt,
            validThrough: j.closingDate ?? undefined,
            hiringOrganization: {
              '@type': 'Organization',
              name: 'Quarau',
              sameAs: resolveSiteUrl(),
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: j.location ?? 'São José dos Campos',
                addressRegion: 'SP',
                addressCountry: 'BR',
              },
            },
            employmentType: {
              clt: 'FULL_TIME',
              pj: 'CONTRACTOR',
              estagio: 'INTERN',
              temporario: 'TEMPORARY',
            }[j.type ?? 'pj'],
          }}
        />
      ) : null}
    </>
  )
}
