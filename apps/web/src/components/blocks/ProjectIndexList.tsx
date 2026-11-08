'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export type IndexRow = {
  id: number
  href: string
  title: string
  place: string | null
  by: string | null
  /** Photo shown beside the pointer (wide screens with a mouse). */
  photo: string | null
  /** Small crop shown at the start of the row on touch screens. */
  thumb: string | null
}

/**
 * Compact project index (docs/DESIGN.md §5ª execução): one line per project. With a mouse, the
 * project's photograph follows the pointer over the list; on touch screens a small crop opens
 * each row. The photographs are decorative here: the row's text is the link.
 */
export function ProjectIndexList({
  rows,
  headingLevel,
}: {
  rows: IndexRow[]
  headingLevel: 2 | 3
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const [active, setActive] = useState<number | null>(null)
  const float = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLOListElement>(null)

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !float.current || !list.current) return
    const box = list.current.getBoundingClientRect()
    float.current.style.transform = `translate3d(${e.clientX - box.left}px, ${e.clientY - box.top}px, 0)`
  }

  return (
    <div className="q-pindex" data-active={active !== null ? '' : undefined}>
      <ol ref={list} className="q-pindex__list" onPointerMove={move}>
        {rows.map((r) => (
          <li key={r.id} data-on={active === r.id ? '' : undefined}>
            <Link
              href={r.href}
              className="q-pindex__row"
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(r.id)}
              onPointerLeave={() => setActive(null)}
            >
              {r.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="q-pindex__thumb"
                  src={r.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <H className="q-pindex__title">{r.title}</H>
              {r.place ? <span className="q-pindex__place">{r.place}</span> : null}
              {r.by ? <span className="q-pindex__by">{r.by}</span> : null}
            </Link>
          </li>
        ))}
      </ol>
      <div ref={float} className="q-pindex__float" aria-hidden="true">
        {rows.map((r) =>
          r.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={r.id}
              src={r.photo}
              alt=""
              loading="lazy"
              decoding="async"
              data-on={active === r.id ? '' : undefined}
            />
          ) : null,
        )}
      </div>
    </div>
  )
}
