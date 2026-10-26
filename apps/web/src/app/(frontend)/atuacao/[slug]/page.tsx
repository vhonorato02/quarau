import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/blocks/Hero'
import { ProjectRows } from '@/components/blocks/Projects'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Img, isMedia } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { docPath } from '@/lib/urls'
import { docMetadata, loadDoc, staticParams } from '@/server/page'
import { getDocBySlug, getTexts, projectsForService } from '@/server/queries'
import { breadcrumbJsonLd } from '@/server/seo'

export const generateStaticParams = staticParams

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return docMetadata('services', (await params).slug)
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, t, listing] = await Promise.all([
    loadDoc('services', slug),
    getTexts(),
    getDocBySlug('pages', 'atuacao'),
  ])
  const projects = await projectsForService(service.id)
  const path = docPath('services', service.slug)
  const listTitle = listing?.title ?? t.service.all
  const caption = isMedia(service.coverImage) ? service.coverImage.caption : null

  return (
    <article>
      <header className="q-intro">
        <div className="q-wrap">
          <Breadcrumbs
            items={[
              { label: t.common.home, href: '/' },
              { label: listTitle, href: '/atuacao' },
              { label: service.title },
            ]}
          />
          <h1>{service.title}</h1>
          <p className="q-lead q-intro__lead">{service.summary}</p>
        </div>
        {isMedia(service.coverImage) ? (
          <figure className="q-wrap q-bleed mt-10 md:mt-14">
            <Img media={service.coverImage} priority sizes="(min-width: 82rem) 82rem, 100vw" />
            {caption ? <figcaption>{caption}</figcaption> : null}
          </figure>
        ) : null}
      </header>

      {service.deliverables?.length ? (
        <section className="q-section q-wrap q-split" aria-labelledby="entregas">
          <h2 id="entregas" className="q-h2">
            {t.service.deliverables}
          </h2>
          <ul className="q-area">
            {service.deliverables.map((d) => (
              <li key={d.id ?? d.item} className="text-xl">
                {d.item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <RenderBlocks blocks={service.story} ctx={{ path, title: service.title, isHome: false }} />

      {projects.length ? (
        <section className="q-section q-wrap" aria-labelledby="projetos-area">
          <h2 id="projetos-area" className="q-h2 mb-10">
            {t.service.relatedProjects}
          </h2>
          <ProjectRows projects={projects} t={t} />
        </section>
      ) : null}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.home, path: '/' },
          { name: listTitle, path: '/atuacao' },
          { name: service.title, path },
        ])}
      />
    </article>
  )
}
