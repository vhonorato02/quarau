import { cn } from '@quarau/ui'
import Link from 'next/link'
import type * as React from 'react'

import { Media } from '@/components/Media'
import { docPath } from '@/lib/urls'
import type { Project } from '@/payload-types'

export function projectPeriod(p: Pick<Project, 'startYear' | 'endYear'>, inProgress = 'em andamento'): string | null {
  if (!p.startYear) return null
  if (!p.endYear) return `${p.startYear} — ${inProgress}`
  return p.startYear === p.endYear ? String(p.startYear) : `${p.startYear}–${p.endYear}`
}

/**
 * Editorial project card. `size="feature"` is used for the first item of a
 * grid and in the home showcase.
 */
export function ProjectCard({
  project,
  size = 'default',
  index,
  className,
  headingLevel = 'h3',
  style,
}: {
  project: Project
  size?: 'default' | 'feature' | 'compact'
  index?: number
  className?: string
  headingLevel?: 'h2' | 'h3'
  style?: React.CSSProperties
}) {
  const H = headingLevel
  const period = projectPeriod(project)
  return (
    <article className={cn('group relative flex flex-col gap-5', className)} style={style}>
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-surface-sunken',
          size === 'feature' ? 'aspect-[16/11]' : size === 'compact' ? 'aspect-[4/3]' : 'aspect-[4/5]',
        )}
      >
        <Media
          media={project.coverImage}
          fill
          sizes={size === 'feature' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          imgClassName="transition-transform duration-[1.4s] ease-(--ease-brand) group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {typeof index === 'number' ? (
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums text-ink backdrop-blur">
            {String(index + 1).padStart(2, '0')}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 grid size-12 translate-y-3 place-items-center rounded-full bg-white text-blue-700 opacity-0 transition-all duration-500 ease-(--ease-brand) group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex flex-wrap gap-x-3 text-sm font-medium text-ink-muted">
          {project.client ? <span>{project.client}</span> : null}
          {period ? <span className="tabular-nums">{period}</span> : null}
        </p>
        <H className={cn('font-semibold text-balance', size === 'feature' ? 'text-h3' : 'text-h4')}>
          <Link href={docPath('projects', project.slug)} className="after:absolute after:inset-0 after:content-['']">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {project.title}
            </span>
          </Link>
        </H>
        {size !== 'compact' && project.summary ? <p className="line-clamp-3 text-pretty text-ink-muted">{project.summary}</p> : null}
      </div>
    </article>
  )
}
