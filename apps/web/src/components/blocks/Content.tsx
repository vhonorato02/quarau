import { cx, isOdsNumber, ODS } from '@quarau/ui'

import { Img, isMedia } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { getTexts } from '@/server/queries'

import { type BlockOf, headingId } from './types'

export function RichTextBlock({ block, index }: { block: BlockOf<'richText'>; index: number }) {
  const id = headingId(block, index)
  if (block.layout === 'split' && block.heading) {
    return (
      <section className="q-wrap q-split" aria-labelledby={id}>
        <h2 id={id} className="q-h2">
          {block.heading}
        </h2>
        <RichText data={block.body} />
      </section>
    )
  }
  return (
    <section className="q-wrap q-narrow" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <h2 id={id} className="q-h2">
          {block.heading}
        </h2>
      ) : null}
      <RichText data={block.body} />
    </section>
  )
}

export function MediaText({ block, index }: { block: BlockOf<'mediaText'>; index: number }) {
  const id = headingId(block, index)
  const caption = isMedia(block.image) ? block.image.caption : null
  return (
    <section
      className={cx('q-wrap q-mt', block.imagePosition === 'left' && 'q-mt--left')}
      aria-labelledby={block.heading ? id : undefined}
    >
      <div className="q-mt__text">
        {block.heading ? (
          <h2 id={id} className="q-h3">
            {block.heading}
          </h2>
        ) : null}
        <RichText data={block.body} />
      </div>
      <figure className="q-mt__img q-figure">
        <Img media={block.image} sizes="(min-width: 56rem) 45vw, 100vw" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </section>
  )
}

export function Quote({ block }: { block: BlockOf<'quote'> }) {
  return (
    <figure className="q-wrap q-quote">
      <blockquote>
        <p>{`\u201c${block.text}\u201d`}</p>
      </blockquote>
      <figcaption>{block.source}</figcaption>
    </figure>
  )
}

export function Figure({ block }: { block: BlockOf<'figure'> }) {
  const caption = block.caption || (isMedia(block.image) ? block.image.caption : null)
  const size = block.size ?? 'wide'
  return (
    <figure
      className={cx(
        'q-figure',
        size === 'full' ? 'q-figure--full' : 'q-wrap',
        size === 'text' && 'q-figure--text',
      )}
    >
      <Img
        media={block.image}
        sizes={
          size === 'text'
            ? '(min-width: 42rem) 42rem, 100vw'
            : size === 'full'
              ? '100vw'
              : '(min-width: 82rem) 82rem, 100vw'
        }
      />
      {caption ? (
        <figcaption className={size === 'full' ? 'q-wrap' : undefined}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}

/** A verified number with its context in a sentence (never a grid of counters). */
export function ProofNumber({ block }: { block: BlockOf<'proofNumber'> }) {
  return (
    <section className="q-wrap q-proof">
      <p className="q-proof__n tabular-nums">{block.value}</p>
      <RichText data={block.text} className="q-proof__t" />
    </section>
  )
}

export function Cycle({ block, index }: { block: BlockOf<'cycle'>; index: number }) {
  const id = headingId(block, index)
  return (
    <section className="q-cycle q-section on-dark" aria-labelledby={id}>
      <div className="q-wrap">
        <h2 id={id}>{block.heading}</h2>
        <ol>
          {(block.steps ?? []).map((s) => (
            <li key={s.id ?? s.label}>{s.label}</li>
          ))}
        </ol>
        {block.text ? <p>{block.text}</p> : null}
      </div>
    </section>
  )
}

export async function Publications({
  block,
  index,
}: {
  block: BlockOf<'publications'>
  index: number
}) {
  const t = await getTexts()
  const id = headingId(block, index)
  return (
    <section className="q-wrap" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <h2 id={id} className="q-h3 mb-6">
          {block.heading}
        </h2>
      ) : null}
      <ul className="q-pubs">
        {(block.items ?? []).map((it) => (
          <li key={it.id ?? it.url} className="q-pub">
            <a href={it.url} target="_blank" rel="noopener noreferrer">
              {isMedia(it.cover) ? <Img media={it.cover} sizes="14rem" /> : null}
              <strong>{it.title}</strong>
              <span className="q-sr">{` ${t.common.externalHint}`}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function OdsList({
  goals,
  heading,
  id,
}: {
  goals: string[]
  heading?: string | null
  id: string
}) {
  const nums = goals.map(Number).filter(isOdsNumber)
  if (!nums.length) return null
  return (
    <section aria-labelledby={heading ? id : undefined}>
      {heading ? (
        <h2 id={id} className="q-h3">
          {heading}
        </h2>
      ) : null}
      <ul className="q-ods">
        {nums.map((n) => (
          <li key={n}>
            <i style={{ background: ODS[n].color }} aria-hidden="true" />
            {`${n}. ${ODS[n].name}`}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Ods({ block, index }: { block: BlockOf<'ods'>; index: number }) {
  return (
    <div className="q-wrap">
      <OdsList goals={block.goals ?? []} heading={block.heading} id={headingId(block, index)} />
    </div>
  )
}
