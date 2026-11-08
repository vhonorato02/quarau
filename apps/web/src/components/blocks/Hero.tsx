import Link from 'next/link'

import { CMSLink } from '@/components/CMSLink'
import { Img, isMedia } from '@/components/Img'
import { getTexts } from '@/server/queries'

import type { BlockContext, BlockOf } from './types'

/** Ends a headline with the green dot of the logo when it closes with a period. */
export function DotHeading({ text }: { text: string }) {
  return text.endsWith('.') ? (
    <>
      {text.slice(0, -1)}
      <span className="q-dot">{text.slice(-1)}</span>
    </>
  ) : (
    <>{text}</>
  )
}

/**
 * Home opening (docs/DESIGN.md §4ª execução): a field photograph fills the screen with the headline,
 * the actions and the photo record set on it; the lead follows as a large statement that lights up
 * word by word as it is read.
 */
export function HeroLens({ block }: { block: BlockOf<'heroLens'> }) {
  const caption = block.caption || (isMedia(block.image) ? block.image.caption : null)
  return (
    <>
      <section className="q-hero on-dark">
        <figure className="q-hero__photo">
          <Img media={block.image} priority sizes="100vw" />
        </figure>
        <div className="q-wrap q-hero__in">
          <h1>
            <DotHeading text={block.heading} />
          </h1>
          <div className="q-hero__side">
            <div className="q-hero__ctas">
              <CMSLink link={block.primary} variant="primary" />
              <CMSLink link={block.secondary} variant="ghost" />
            </div>
            <span aria-hidden="true" />
            {caption ? <p className="q-hero__rec">{caption}</p> : null}
          </div>
        </div>
      </section>
      {block.lead ? (
        <section className="q-wrap q-statement">
          <p>
            {block.lead.split(' ').map((word, i) => (
              <span key={`${word}-${i}`}>{`${word} `}</span>
            ))}
          </p>
        </section>
      ) : null}
    </>
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
        <h1>
          <DotHeading text={block.heading} />
        </h1>
        {block.lead ? <p className="q-lead q-intro__lead">{block.lead}</p> : null}
      </div>
      {isMedia(block.image) ? (
        <figure className="q-wrap q-bleed mt-10 md:mt-14">
          <Img
            media={block.image}
            priority
            sizes="(min-width: 82rem) 82rem, (min-width: 40rem) 100vw, 360px"
          />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      ) : null}
    </section>
  )
}
