'use client'

import Link from 'next/link'
import { type ReactNode, useState } from 'react'

export type Place = {
  key: string
  name: string
  uf: string | null
  /** Position on the map canvas (BRAZIL_VIEWBOX units). */
  x: number
  y: number
  /** Close pins stack their labels: one above the pin line, one below. */
  shift: 'up' | 'down' | null
  projects: Array<{ id: number; title: string; href: string }>
}

/**
 * Pins, labels and the list of places for the "Onde atuamos" map. Pointing at a place in the list
 * (or focusing one of its projects) lights its pin, and pointing at a pin lights the list entry.
 * The list is the accessible content; the drawing is decorative.
 */
export function TerritoryMapClient({
  places,
  width,
  height,
  map,
  head,
}: {
  places: Place[]
  width: number
  height: number
  map: ReactNode
  head: ReactNode
}) {
  const [active, setActive] = useState<string | null>(null)
  const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`
  // A light route from the southern pins to the northern ones: "do Vale do Paraíba ao sertão".
  const route = places.length > 1 ? routePath(places) : null

  return (
    <div className="q-terr__grid" data-active={active ? '' : undefined}>
      {head}
      <figure className="q-terr__figure">
        {map}
        {route ? (
          <svg
            className="q-terr__route"
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
            focusable="false"
          >
            <path d={route} />
          </svg>
        ) : null}
        {places.map((p) => (
          <span
            key={p.key}
            className="q-terr__pin"
            data-shift={p.shift ?? undefined}
            data-on={active === p.key ? '' : undefined}
            style={{ left: pct(p.x, width), top: pct(p.y, height) }}
            onMouseEnter={() => setActive(p.key)}
            onMouseLeave={() => setActive(null)}
            aria-hidden="true"
          >
            <i />
            <span>{p.name}</span>
          </span>
        ))}
      </figure>
      <ol className="q-terr__list">
        {places.map((p) => (
          <li
            key={p.key}
            data-on={active === p.key ? '' : undefined}
            onMouseEnter={() => setActive(p.key)}
            onMouseLeave={() => setActive(null)}
          >
            <h3>{p.name}</h3>
            <ul>
              {p.projects.map((pr) => (
                <li key={pr.id}>
                  <Link
                    href={pr.href}
                    onFocus={() => setActive(p.key)}
                    onBlur={() => setActive(null)}
                  >
                    {pr.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Gentle arcs joining the places from south to north, bowing towards the coast. */
function routePath(places: Place[]): string {
  const pts = [...places].sort((a, b) => b.y - a.y)
  let d = `M${pts[0]!.x.toFixed(1)} ${pts[0]!.y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!
    const b = pts[i]!
    const cx = (a.x + b.x) / 2 + Math.abs(b.y - a.y) * 0.35
    const cy = (a.y + b.y) / 2
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }
  return d
}
