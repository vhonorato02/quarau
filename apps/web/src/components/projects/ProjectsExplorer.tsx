'use client'

import { cn } from '@quarau/ui'
import { useMemo, useState } from 'react'
import type * as React from 'react'

import type { Project } from '@/payload-types'

import { ProjectCard } from './ProjectCard'

type Area = { id: number; title: string }

/** Portfolio grid with accessible area filters (buttons with aria-pressed). */
export function ProjectsExplorer({ projects, areas, allLabel }: { projects: Project[]; areas: Area[]; allLabel: string }) {
  const [active, setActive] = useState<number | null>(null)
  const filtered = useMemo(
    () =>
      active === null
        ? projects
        : projects.filter((p) => (p.services ?? []).some((s) => (typeof s === 'object' ? s.id : s) === active)),
    [active, projects],
  )

  return (
    <div className="flex flex-col gap-14">
      {areas.length > 1 ? (
        <div role="group" aria-label="Filtrar por área de atuação" className="flex flex-wrap gap-2">
          {[{ id: null as number | null, title: allLabel }, ...areas].map((a) => (
            <button
              key={a.id ?? 'all'}
              type="button"
              aria-pressed={active === a.id}
              onClick={() => setActive(a.id)}
              className={cn(
                'h-11 rounded-full border px-5 text-sm font-medium transition-colors',
                active === a.id ? 'border-ink bg-ink text-white' : 'border-line-strong hover:border-ink',
              )}
            >
              {a.title}
            </button>
          ))}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {filtered.length} projetos
      </p>
      <ul className="grid gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-12">
        {filtered.map((p, i) => {
          // Editorial rhythm: one wide card, then two side by side.
          const wide = i % 3 === 0
          return (
            <li
              key={p.id}
              className={cn(wide ? 'md:col-span-2 lg:col-span-8' : 'lg:col-span-4', !wide && i % 3 === 1 && 'lg:mt-28', i % 6 === 3 && 'lg:col-start-5')}
              data-reveal
              style={{ '--reveal-delay': (i % 3) * 80 } as React.CSSProperties}
            >
              <ProjectCard project={p} size={wide ? 'feature' : 'default'} headingLevel="h2" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
