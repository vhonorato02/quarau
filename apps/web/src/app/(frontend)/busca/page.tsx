import type { Metadata } from 'next'
import Link from 'next/link'

import { fill } from '@/cms/globals/site-texts'
import { Breadcrumbs } from '@/components/blocks/Hero'
import { docPath } from '@/lib/urls'
import { getGlobal, getTexts, search } from '@/server/queries'
import { buildMetadata } from '@/server/seo'

type Props = { searchParams: Promise<{ q?: string | string[] }> }

export async function generateMetadata(): Promise<Metadata> {
  const [t, settings] = await Promise.all([getTexts(), getGlobal('settings')])
  return buildMetadata({ title: t.search.title, path: '/busca', noindex: true, settings })
}

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? ''
  const [t, hits] = await Promise.all([getTexts(), q ? search(q) : Promise.resolve([])])
  const type = {
    projects: t.search.typeProjects,
    pages: t.search.typePages,
    services: t.search.typeServices,
    news: t.search.typeNews,
  }
  return (
    <section className="q-intro q-wrap pb-[var(--spacing-section)]">
      <Breadcrumbs items={[{ label: t.common.home, href: '/' }, { label: t.search.title }]} />
      <h1>{t.search.title}</h1>
      <form className="q-search" role="search" action="/busca">
        <label htmlFor="q" className="q-sr">
          {t.search.label}
        </label>
        <input
          id="q"
          name="q"
          type="search"
          className="q-input"
          defaultValue={q}
          placeholder={t.search.label}
        />
        <button type="submit" className="q-btn">
          {t.search.submit}
        </button>
      </form>
      {q ? (
        <>
          <p className="q-muted mt-8" role="status">
            {hits.length === 0
              ? fill(t.search.empty, { q })
              : fill(hits.length === 1 ? t.search.resultsOne : t.search.resultsMany, {
                  n: hits.length,
                  q,
                })}
          </p>
          {hits.length ? (
            <ul className="q-results">
              {hits.map((h) => (
                <li key={`${h.collection}-${h.slug}`}>
                  <Link href={docPath(h.collection, h.slug)}>
                    <small>{type[h.collection]}</small>
                    <strong>{h.title}</strong>
                    {h.summary ? <span className="q-muted">{h.summary}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </section>
  )
}
