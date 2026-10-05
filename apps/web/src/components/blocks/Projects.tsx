import { ArrowIcon, Button, Container, Section } from '@quarau/ui'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type * as React from 'react'

import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Locale } from '@/i18n/routing'
import { listDocs } from '@/lib/queries'
import type { Project, ProjectsBlock as ProjectsBlockType } from '@/payload-types'

import { SectionHeader, toneToSection } from './SectionHeader'

export async function ProjectsBlock({ block, locale }: { block: ProjectsBlockType; locale: Locale }) {
  const t = await getTranslations('common')
  const limit = block.limit ?? 6
  let projects: Project[]
  if (block.mode === 'selected') {
    projects = (block.selected ?? []).filter((p): p is Project => typeof p === 'object')
  } else {
    const all = await listDocs('projects', { locale, sort: '-startYear', limit: 50, depth: 1 })
    projects = block.mode === 'featured' ? [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)] : all
  }
  projects = projects.slice(0, limit)
  if (!projects.length) return null

  const [first, ...rest] = projects
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          action={
            block.showAllLink ? (
              <Button asChild variant="secondary">
                <Link href="/projetos">
                  {t('seeAllProjects')}
                  <ArrowIcon />
                </Link>
              </Button>
            ) : null
          }
        />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
          {first ? (
            <ProjectCard project={first} size="feature" index={0} className="md:col-span-2 lg:col-span-8" />
          ) : null}
          {rest.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i + 1}
              className={i === 0 ? 'lg:col-span-4 lg:mt-24' : 'lg:col-span-4'}
              style={{ '--reveal-delay': i * 80 } as React.CSSProperties}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
