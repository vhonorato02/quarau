import type { Metadata } from 'next'
import Link from 'next/link'

import { fill } from '@/cms/globals/site-texts'
import { Breadcrumbs } from '@/components/blocks/Hero'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Img, isMedia, mediaSrc } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { docPath } from '@/lib/urls'
import { docMetadata, loadDoc, staticParams } from '@/server/page'
import { getDocBySlug, getTexts } from '@/server/queries'
import { articleJsonLd, breadcrumbJsonLd } from '@/server/seo'

export const generateStaticParams = staticParams

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return docMetadata('news', (await params).slug, 'article')
}

export default async function NewsPage({ params }: Props) {
  const { slug } = await params
  const [news, t, listing] = await Promise.all([
    loadDoc('news', slug),
    getTexts(),
    getDocBySlug('pages', 'noticias'),
  ])
  const path = docPath('news', news.slug)
  const listTitle = listing?.title ?? t.news.all
  const date = news.publishedAt
    ? new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
      }).format(new Date(news.publishedAt))
    : null
  const related = (news.relatedProjects ?? []).filter((p) => typeof p === 'object')
  const caption = isMedia(news.coverImage) ? news.coverImage.caption : null

  return (
    <article>
      <header className="q-intro">
        <div className="q-wrap">
          <Breadcrumbs
            items={[
              { label: t.common.home, href: '/' },
              { label: listTitle, href: '/noticias' },
              { label: news.title },
            ]}
          />
          {date && news.publishedAt ? (
            <p className="q-muted mb-3">
              <time dateTime={news.publishedAt}>{fill(t.news.publishedOn, { date })}</time>
            </p>
          ) : null}
          <h1>{news.title}</h1>
          <p className="q-lead q-intro__lead">{news.summary}</p>
        </div>
        <figure className="q-wrap q-bleed mt-10 md:mt-14">
          <Img media={news.coverImage} eager sizes="(min-width: 82rem) 82rem, 100vw" />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      </header>

      <div className="q-section">
        <RenderBlocks blocks={news.story} ctx={{ path, title: news.title, isHome: false }} flow />
      </div>

      {related.length || news.sourceUrl ? (
        <footer className="q-wrap grid gap-6 pb-[var(--spacing-section)]">
          {related.length ? (
            <section aria-labelledby="relacionados">
              <h2 id="relacionados" className="q-h3">
                {t.news.related}
              </h2>
              <ul className="mt-4 grid gap-2">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link className="q-link text-xl" href={docPath('projects', p.slug)}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {news.sourceUrl ? (
            <p>
              <a className="q-link" href={news.sourceUrl} target="_blank" rel="noopener noreferrer">
                {t.news.source}
                <span className="q-sr">{` ${t.common.externalHint}`}</span>
              </a>
            </p>
          ) : null}
        </footer>
      ) : null}

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t.common.home, path: '/' },
            { name: listTitle, path: '/noticias' },
            { name: news.title, path },
          ]),
          articleJsonLd({
            type: 'Article',
            title: news.title,
            description: news.summary,
            path,
            image: mediaSrc(news.coverImage, 'og'),
            published: news.publishedAt,
            modified: news.updatedAt,
          }),
        ]}
      />
    </article>
  )
}
