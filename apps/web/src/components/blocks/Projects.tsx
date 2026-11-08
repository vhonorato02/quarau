import Link from 'next/link'

import { fill, type SiteTexts } from '@/cms/globals/site-texts'
import { CMSLink } from '@/components/CMSLink'
import { Img } from '@/components/Img'
import { docPath } from '@/lib/urls'
import type { Project } from '@/payload-types'
import { getTexts, listProjects } from '@/server/queries'

import { type BlockOf, headingId } from './types'

/** "2015–2023", "desde 2022", "2020" or null when no year is confirmed. */
export function projectPeriod(
  p: Pick<Project, 'startYear' | 'endYear' | 'ongoing'>,
  t: SiteTexts,
): string | null {
  if (p.ongoing && p.startYear) return fill(t.project.since, { year: p.startYear })
  if (p.startYear && p.endYear && p.endYear !== p.startYear)
    return `${p.startYear}\u2013${p.endYear}`
  return p.startYear ? String(p.startYear) : p.endYear ? String(p.endYear) : null
}

/**
 * The project index: one card per project (photograph, territory and period, name, summary, who
 * carries it out). On wide screens the cards stack as the page scrolls (docs/DESIGN.md).
 */
export function ProjectRows({
  projects,
  t,
  headingLevel = 3,
  leadImage = false,
}: {
  projects: Project[]
  t: SiteTexts
  headingLevel?: 2 | 3
  /** The first photo is above the fold (list right after the page opening): load it first. */
  leadImage?: boolean
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ul className="q-index">
      {projects.map((p, i) => {
        const period = projectPeriod(p, t)
        return (
          <li key={p.id}>
            <Link className="q-row" href={docPath('projects', p.slug)}>
              <span className="q-row__img">
                <Img media={p.coverImage} sizes="100vw" priority={leadImage && i === 0} />
              </span>
              <span className="q-row__main">
                <span className="q-row__place">
                  {[p.territory, period].filter(Boolean).join(', ')}
                </span>
                <H>{p.title}</H>
                {p.summary ? <span className="q-row__summary">{p.summary}</span> : null}
                {p.carriedOutBy ? <span className="q-row__meta">{p.carriedOutBy}</span> : null}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export async function ProjectIndex({
  block,
  index,
}: {
  block: BlockOf<'projectIndex'>
  index: number
}) {
  const ids = (block.projects ?? []).map((p) => (typeof p === 'object' ? p.id : p))
  const [projects, t] = await Promise.all([
    listProjects({ mode: block.mode, ids, limit: block.limit }),
    getTexts(),
  ])
  const id = headingId(block, index)
  return (
    <section className="q-section q-wrap" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <div className="q-head">
          <h2 id={id} className="q-h2">
            {block.heading}
          </h2>
          {block.intro ? <p>{block.intro}</p> : null}
        </div>
      ) : null}
      {projects.length ? (
        <ProjectRows
          projects={projects}
          t={t}
          headingLevel={block.heading ? 3 : 2}
          leadImage={index <= 1}
        />
      ) : (
        <p className="q-muted">{t.project.empty}</p>
      )}
      {block.link?.label ? (
        <p className="q-index-more">
          <CMSLink link={block.link} variant="ghost" />
        </p>
      ) : null}
    </section>
  )
}
