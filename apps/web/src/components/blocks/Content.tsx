import { Container, Eyebrow, Heading, Section, cn } from '@quarau/ui'

import { RichText } from '@/components/RichText'
import type { ContentBlock as ContentBlockType } from '@/payload-types'

import { toneToSection } from './SectionHeader'

export function ContentBlock({ block }: { block: ContentBlockType }) {
  const split = block.layout !== 'narrow'
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container className={cn(split ? 'grid gap-10 lg:grid-cols-12 lg:gap-16' : 'flex flex-col items-center')}>
        {block.eyebrow || block.heading ? (
          <div className={cn('flex flex-col gap-5', split ? 'lg:sticky lg:top-28 lg:col-span-5 lg:self-start' : 'mb-10 w-full max-w-(--container-prose)')}>
            {block.eyebrow ? <Eyebrow data-reveal>{block.eyebrow}</Eyebrow> : null}
            {block.heading ? (
              <Heading size="h2" data-reveal>
                {block.heading}
              </Heading>
            ) : null}
          </div>
        ) : null}
        <div data-reveal className={cn(split && 'lg:col-span-7 lg:col-start-6', !block.heading && split && 'lg:col-start-4')}>
          <RichText data={block.body} className="text-[1.125rem] leading-[1.7]" />
        </div>
      </Container>
    </Section>
  )
}
