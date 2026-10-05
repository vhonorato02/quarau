import { Container } from '@quarau/ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageHeader } from '@/components/PageHeader'
import type { Locale } from '@/i18n/routing'
import { rateLimit } from '@/lib/rate-limit'
import { search, type SearchHit } from '@/lib/search'

export const metadata: Metadata = { title: 'Busca', robots: { index: false, follow: true } }

/** Escapes everything except the <mark> tags produced by Meilisearch highlighting. */
function safeHighlight(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;mark&gt;/g, '<mark>')
    .replace(/&lt;\/mark&gt;/g, '</mark>')
}

export default async function SearchPage({ params, searchParams }: PageProps<'/[locale]/busca'>) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.slice(0, 120) ?? ''
  const t = await getTranslations('search')

  let results: { hits: SearchHit[]; total: number; available: boolean } = { hits: [], total: 0, available: true }
  if (q) {
    const rl = await rateLimit('search:global', 600, 60)
    results = rl.ok ? await search(q, { locale: locale as Locale }).catch(() => ({ hits: [], total: 0, available: false })) : results
  }

  return (
    <>
      <PageHeader title={t('title')} crumbs={[{ label: 'Início', href: '/' }, { label: t('title') }]}>
        <form role="search" action="/busca" className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
          <label htmlFor="q" className="sr-only">
            {t('label')}
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder={t('placeholder')}
            className="h-14 flex-1 rounded-full border border-line-strong bg-surface px-6 text-lg focus-visible:border-blue-700"
            autoComplete="off"
          />
          <button type="submit" className="h-14 rounded-full bg-blue-700 px-8 font-semibold text-white hover:bg-blue-800">
            {t('submit')}
          </button>
        </form>
      </PageHeader>
      <section className="pb-(--spacing-section)">
        <Container className="max-w-4xl" aria-live="polite">
          {!q ? <p className="text-ink-muted">{t('empty')}</p> : null}
          {q && !results.available ? <p className="text-ink-muted">{t('unavailable')}</p> : null}
          {q && results.available ? (
            <>
              <p className="mb-8 text-ink-muted">{t('results', { count: results.total, query: q })}</p>
              <ol className="divide-y divide-line border-y border-line">
                {results.hits.map((h) => (
                  <li key={h.id} className="group relative flex flex-col gap-2 py-7">
                    <span className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-blue-700 uppercase">
                      {t(`collections.${h.collection}`)}
                    </span>
                    <h2 className="text-h4 font-semibold">
                      <Link href={h.url} className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:underline-offset-4">
                        <span dangerouslySetInnerHTML={{ __html: safeHighlight(h._formatted?.title ?? h.title) }} />
                      </Link>
                    </h2>
                    {h.excerpt ? (
                      <p className="text-ink-muted" dangerouslySetInnerHTML={{ __html: safeHighlight(h._formatted?.excerpt ?? h.excerpt) }} />
                    ) : null}
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </Container>
      </section>
    </>
  )
}
