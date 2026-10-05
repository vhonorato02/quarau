import { Badge, Container } from '@quarau/ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHeader } from '@/components/PageHeader'
import type { Locale } from '@/i18n/routing'
import { getGlobal, listDocs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/trabalhe-conosco'>): Promise<Metadata> {
  const { locale } = await params
  const settings = await getGlobal('site-settings', locale as Locale).catch(() => null)
  return buildMetadata({
    title: 'Trabalhe conosco',
    description: 'Vagas e oportunidades para atuar em projetos com a Quarau.',
    path: '/trabalhe-conosco',
    locale: locale as Locale,
    settings,
  })
}

export default async function JobsPage({ params }: PageProps<'/[locale]/trabalhe-conosco'>) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('jobs')
  const jobs = await listDocs('jobs', { locale: locale as Locale, sort: '-publishedAt', depth: 0 })
  return (
    <>
      <PageHeader
        eyebrow="Carreiras"
        title={t('title')}
        crumbs={[{ label: 'Início', href: '/' }, { label: t('title') }]}
      />
      <section className="pb-(--spacing-section)">
        <Container>
          {jobs.length ? (
            <ul className="divide-line border-line divide-y border-y">
              {jobs.map((j) => (
                <li
                  key={j.id}
                  className="group relative flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-h3 font-semibold">
                      <Link
                        href={docPath('jobs', j.slug)}
                        className="group-hover:text-blue-700 after:absolute after:inset-0 after:content-['']"
                      >
                        {j.title}
                      </Link>
                    </h2>
                    {j.summary ? <p className="text-ink-muted">{j.summary}</p> : null}
                  </div>
                  <div className="flex gap-2">
                    {j.location ? <Badge>{j.location}</Badge> : null}
                    <Badge className={j.opening === 'open' ? 'text-green-700' : 'text-ink-muted'}>
                      {j.opening === 'open' ? t('open') : t('closed')}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lead text-ink-muted max-w-2xl">
              {t('empty')}{' '}
              <Link href="/contato" className="text-blue-700 underline underline-offset-4">
                Contato
              </Link>
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
