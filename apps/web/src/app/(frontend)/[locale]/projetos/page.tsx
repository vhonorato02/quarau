import { Container } from '@quarau/ui'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PageHeader } from '@/components/PageHeader'
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer'
import type { Locale } from '@/i18n/routing'
import { getDocBySlug, getGlobal, listDocs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

const LEAD =
  'Projetos educativos, culturais e socioambientais que a Quarau concebeu, gerenciou ou apoiou — com resultados medidos e presença no território.'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projetos'>): Promise<Metadata> {
  const { locale } = await params
  const settings = await getGlobal('site-settings', locale as Locale).catch(() => null)
  return buildMetadata({
    title: 'Projetos',
    description: LEAD,
    path: '/projetos',
    locale: locale as Locale,
    settings,
  })
}

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projetos'>) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('projects')
  const [projects, services, intro] = await Promise.all([
    listDocs('projects', { locale: locale as Locale, sort: '-startYear', depth: 1 }),
    listDocs('services', { locale: locale as Locale, sort: 'order', depth: 0 }),
    // Optional editable page "projetos" lets editors add blocks below the grid.
    getDocBySlug('pages', 'projetos', locale as Locale).catch(() => null),
  ])
  const usedAreaIds = new Set(
    projects.flatMap((p) => (p.services ?? []).map((s) => (typeof s === 'object' ? s.id : s))),
  )
  const areas = services
    .filter((s) => usedAreaIds.has(s.id))
    .map((s) => ({ id: s.id, title: s.title }))

  return (
    <>
      <PageHeader
        eyebrow={`${projects.length} ${projects.length === 1 ? 'projeto' : 'projetos'}`}
        title={t('title')}
        lead={intro?.meta?.description ?? LEAD}
        crumbs={[{ label: 'Início', href: '/' }, { label: t('title') }]}
      />
      <section className="pb-(--spacing-section)">
        <Container>
          {projects.length ? (
            <ProjectsExplorer projects={projects} areas={areas} allLabel={t('filterAll')} />
          ) : (
            <p className="text-lead text-ink-muted">{t('empty')}</p>
          )}
        </Container>
      </section>
      {intro?.layout?.length ? (
        <RenderBlocks blocks={intro.layout} locale={locale as Locale} />
      ) : null}
    </>
  )
}
