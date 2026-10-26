import Link from 'next/link'

import { Media } from '@/components/Media'
import { docPath } from '@/lib/urls'
import type { News } from '@/payload-types'

export const formatDate = (iso?: string | null) =>
  iso
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
      }).format(new Date(iso))
    : ''

export function NewsCard({ item }: { item: News }) {
  return (
    <article className="group relative flex flex-col gap-5">
      <div className="bg-surface-sunken relative aspect-[3/2] overflow-hidden rounded-lg">
        <Media
          media={item.coverImage}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          imgClassName="transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <time dateTime={item.publishedAt ?? undefined} className="text-ink-muted text-sm">
        {formatDate(item.publishedAt)}
      </time>
      <h2 className="text-h4 font-semibold text-balance">
        <Link
          href={docPath('news', item.slug)}
          className="group-hover:underline group-hover:underline-offset-4 after:absolute after:inset-0 after:content-['']"
        >
          {item.title}
        </Link>
      </h2>
      {item.summary ? <p className="text-ink-muted line-clamp-3">{item.summary}</p> : null}
    </article>
  )
}
