import { BRAZIL_STATES, BRAZIL_VIEWBOX, project } from '@/lib/brazil-map'
import { docPath } from '@/lib/urls'
import { listProjects } from '@/server/queries'

import { TerritoryMapClient, type Place } from './TerritoryMapClient'
import { type BlockOf, headingId } from './types'

/**
 * Labels sit west of the pins (the projects are near the coast, the land is to the west). Close
 * pins (São José dos Campos and Atibaia are 60 km apart) stack their labels: west one up.
 */
const NEAR = 70

/**
 * "Onde atuamos": Brazil by state with one pin per municipality that has published projects
 * (latitude/longitude on the project), beside the list of places and their projects.
 * The map is static SVG generated from IBGE boundaries (src/lib/brazil-map.ts, tools/geo).
 */
export async function Territories({
  block,
  index,
}: {
  block: BlockOf<'territories'>
  index: number
}) {
  const projects = await listProjects()
  const byPlace = new Map<string, Place>()
  for (const p of projects) {
    if (typeof p.latitude !== 'number' || typeof p.longitude !== 'number' || !p.territory) continue
    const key = p.territory
    const place = byPlace.get(key) ?? {
      key,
      name: p.territory,
      uf: /,\s*([A-Z]{2})$/.exec(p.territory)?.[1] ?? null,
      ...project(p.longitude, p.latitude),
      shift: null as Place['shift'],
      projects: [],
    }
    place.projects.push({ id: p.id, title: p.title, href: docPath('projects', p.slug) })
    byPlace.set(key, place)
  }
  const places = [...byPlace.values()]
  if (!places.length) return null
  for (const a of places) {
    const near = places.filter((b) => b !== a && Math.hypot(b.x - a.x, b.y - a.y) < NEAR)
    if (near.length) a.shift = near.some((b) => b.x > a.x) ? 'up' : 'down'
  }
  // North to south, the order in which the list reads.
  places.sort((a, b) => a.y - b.y)
  const ufs = new Set(places.map((p) => p.uf).filter(Boolean))
  const id = headingId(block, index)

  return (
    <section className="q-wrap q-terr on-dark" aria-labelledby={id}>
      <TerritoryMapClient
        places={places}
        width={BRAZIL_VIEWBOX.width}
        height={BRAZIL_VIEWBOX.height}
        map={
          <svg
            className="q-terr__map"
            viewBox={`0 0 ${BRAZIL_VIEWBOX.width} ${BRAZIL_VIEWBOX.height}`}
            aria-hidden="true"
            focusable="false"
          >
            <g className="q-terr__states">
              {BRAZIL_STATES.map((s) => (
                <path key={s.uf} d={s.d} data-on={ufs.has(s.uf) ? '' : undefined} />
              ))}
            </g>
          </svg>
        }
        head={
          <div className="q-terr__head">
            <h2 id={id} className="q-h2">
              {block.heading}
            </h2>
            {block.intro ? <p>{block.intro}</p> : null}
          </div>
        }
      />
    </section>
  )
}
