import type { Metadata } from 'next'
import Link from 'next/link'

import { OdsList } from '@/components/blocks/Content'
import { Breadcrumbs } from '@/components/blocks/Hero'
import { projectPeriod } from '@/components/blocks/Projects'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Img, isMedia, mediaSrc } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { docPath } from '@/lib/urls'
import { docMetadata, loadDoc, staticParams } from '@/server/page'
import { getDocBySlug, getTexts, nextProject } from '@/server/queries'
import { articleJsonLd, breadcrumbJsonLd } from '@/server/seo'

export const generateStaticParams = staticParams

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return docMetadata('projects', (await params).slug)
}

const names = (items: unknown[] | null | undefined, key: 'name' | 'title') =>
  (items ?? []).flatMap((i) =>
    typeof i === 'object' && i && key in i ? [String((i as Record<string, unknown>)[key])] : [],
  )

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, t, listing] = await Promise.all([
    loadDoc('projects', slug),
    getTexts(),
    getDocBySlug('pages', 'projetos'),
  ])
  const next = await nextProject(project)
  const path = docPath('projects', project.slug)
  const period = projectPeriod(project, t)
  const partners = names(project.partners, 'name')
  const services = (project.services ?? []).filter((s) => typeof s === 'object')
  const listTitle = listing?.title ?? t.project.all
  const caption = isMedia(project.coverImage) ? project.coverImage.caption : null

  const ficha: Array<{ label: string; value: React.ReactNode; wide?: boolean }> = [
    { label: t.project.territory, value: project.territoryDetail || project.territory },
    ...(project.carriedOutBy
      ? [{ label: t.project.carriedOutBy, value: project.carriedOutBy }]
      : []),
    ...(period
      ? [{ label: t.project.period, value: <span className="tabular-nums">{period}</span> }]
      : []),
    ...(project.program ? [{ label: t.project.program, value: project.program }] : []),
    ...(project.role ? [{ label: t.project.role, value: project.role, wide: true }] : []),
    ...(services.length
      ? [
          {
            label: t.project.areas,
            wide: true,
            value: (
              <span className="flex flex-wrap gap-x-4">
                {services.map((s) => (
                  <Link key={s.id} className="q-link" href={docPath('services', s.slug)}>
                    {s.title}
                  </Link>
                ))}
              </span>
            ),
          },
        ]
      : []),
  ]

  return (
    <article>
      <header className="q-intro">
        <div className="q-wrap">
          <Breadcrumbs
            items={[
              { label: t.common.home, href: '/' },
              { label: listTitle, href: '/projetos' },
              { label: project.title },
            ]}
          />
          <p className="q-row__place mb-3">{project.territory}</p>
          <h1>{project.title}</h1>
          <p className="q-lead q-intro__lead">{project.summary}</p>
          <dl className="q-ficha">
            {ficha.map((f) => (
              <div key={f.label} className={f.wide ? 'q-ficha__wide' : undefined}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="q-wrap q-bleed mt-10 md:mt-14">
          <Img media={project.coverImage} eager sizes="(min-width: 82rem) 82rem, 100vw" />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      </header>

      {project.lead ? (
        <section className="q-wrap q-story pt-[var(--spacing-section)] pb-12 md:pb-16">
          <p className="q-story__lead">{project.lead}</p>
        </section>
      ) : null}

      <div className={project.lead ? 'pb-[var(--spacing-section)]' : 'q-section'}>
        <RenderBlocks
          blocks={project.story}
          ctx={{ path, title: project.title, isHome: false }}
          flow
        />
      </div>

      {project.ods?.length || partners.length ? (
        <section className="q-wrap grid gap-10 pb-[var(--spacing-section)] md:grid-cols-2">
          {project.ods?.length ? (
            <OdsList goals={project.ods} heading={t.project.ods} id="ods" />
          ) : null}
          {partners.length ? (
            <section aria-labelledby="parceiros">
              <h2 id="parceiros" className="q-h3">
                {t.project.partners}
              </h2>
              <ul className="mt-4 grid gap-2 text-lg font-medium">
                {partners.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </section>
      ) : null}

      {next ? (
        <nav className="q-wrap pb-[var(--spacing-section)]" aria-label={t.project.next}>
          <Link className="q-next" href={docPath('projects', next.slug)}>
            <span>{t.project.next}</span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      ) : null}

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t.common.home, path: '/' },
            { name: listTitle, path: '/projetos' },
            { name: project.title, path },
          ]),
          articleJsonLd({
            type: 'CreativeWork',
            title: project.title,
            description: project.summary,
            path,
            image: mediaSrc(project.coverImage, 'og'),
            published: project.publishedAt,
            modified: project.updatedAt,
            place: project.territoryDetail || project.territory,
          }),
        ]}
      />
    </article>
  )
}
