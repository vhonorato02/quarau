import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/blocks/Hero'
import { ProjectRows } from '@/components/blocks/Projects'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { RichText } from '@/components/RichText'
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
  // Leading text blocks sit next to the deliverables; the rest of the story follows below.
  const story = service.story ?? []
  const firstOther = story.findIndex((b) => b.blockType !== 'richText')
  const split = firstOther === -1 ? story.length : firstOther
  const intro = story.slice(0, split).filter((b) => b.blockType === 'richText')
  const rest = story.slice(split)
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

      {intro.length || service.deliverables?.length ? (
        <section className="q-section q-wrap q-split" aria-labelledby="entregas">
          <h2 id="entregas" className="q-h2">
            {t.service.deliverables}
          </h2>
          <div className="q-split__body">
            {intro.map((b) => (
              <RichText key={b.id ?? 'intro'} data={b.body} className="mb-8" />
            ))}
            {service.deliverables?.length ? (
              <ul className="q-checklist">
                {service.deliverables.map((d) => (
                  <li key={d.id ?? d.item}>{d.item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      <RenderBlocks blocks={rest} ctx={{ path, title: service.title, isHome: false }} />

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
