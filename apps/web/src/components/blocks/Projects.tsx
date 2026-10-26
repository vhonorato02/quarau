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

/** The project index: territory first, then the name, who carries it out and the period. */
export function ProjectRows({
  projects,
  t,
  headingLevel = 3,
}: {
  projects: Project[]
  t: SiteTexts
  headingLevel?: 2 | 3
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ul className="q-index">
      {projects.map((p, i) => {
        const period = projectPeriod(p, t)
        return (
          <li key={p.id}>
            <Link className="q-row" href={docPath('projects', p.slug)}>
              <span className="q-row__place">{p.territory}</span>
              <span className="q-row__main">
                <H>{p.title}</H>
                {p.carriedOutBy || period ? (
                  <span className="q-row__meta">
                    {p.carriedOutBy ? <span>{p.carriedOutBy}</span> : null}
                    {period ? <span className="tabular-nums">{period}</span> : null}
                  </span>
                ) : null}
              </span>
              <span className="q-row__img">
                <Img
                  media={p.coverImage}
                  sizes="(min-width: 56rem) 22vw, 6.5rem"
                  priority={i < 2}
                />
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
        <ProjectRows projects={projects} t={t} />
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
