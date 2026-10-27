import Link from 'next/link'

import { CMSLink } from '@/components/CMSLink'
import { Img, isMedia } from '@/components/Img'
import { getTexts } from '@/server/queries'

import type { BlockContext, BlockOf } from './types'

/** Home opening: the Q ring of the brand becomes the window of a field photo (docs/DESIGN.md). */
export function HeroLens({ block }: { block: BlockOf<'heroLens'> }) {
  const caption = block.caption || (isMedia(block.image) ? block.image.caption : null)
  return (
    <section className="q-wrap q-hero">
      <div className="q-hero__text">
        <h1>{block.heading}</h1>
        <p className="q-hero__lead">{block.lead}</p>
        <div className="q-hero__ctas">
          <CMSLink link={block.primary} variant="primary" />
          <CMSLink link={block.secondary} variant="ghost" />
        </div>
      </div>
      <figure className="q-lens">
        <div className="q-lens__ring">
          <Img media={block.image} priority sizes="(min-width: 56rem) 40vw, 84vw" crop="square" />
        </div>
        <span className="q-lens__dot" aria-hidden="true" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </section>
  )
}

export async function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  const t = await getTexts()
  return (
    <nav className="q-crumbs" aria-label={t.common.breadcrumbLabel}>
      <ol>
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`}>
            {it.href ? (
              <Link href={it.href}>{it.label}</Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Opening of an inner page: breadcrumb, H1, lead and an optional wide photo. */
export async function PageIntro({
  block,
  ctx,
}: {
  block: BlockOf<'pageIntro'>
  ctx: BlockContext
}) {
  const t = await getTexts()
  const caption = block.caption || (isMedia(block.image) ? block.image.caption : null)
  return (
    <section className="q-intro">
      <div className="q-wrap">
        {ctx.isHome ? null : (
          <Breadcrumbs items={[{ label: t.common.home, href: '/' }, { label: ctx.title }]} />
        )}
        <h1>{block.heading}</h1>
        {block.lead ? <p className="q-lead q-intro__lead">{block.lead}</p> : null}
      </div>
      {isMedia(block.image) ? (
        <figure className="q-wrap q-bleed mt-10 md:mt-14">
          <Img media={block.image} eager sizes="(min-width: 82rem) 82rem, 100vw" />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      ) : null}
    </section>
  )
}
