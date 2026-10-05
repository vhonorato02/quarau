import { Container, Eyebrow, Heading, Section, cn } from '@quarau/ui'

import { CMSLink, type LinkData } from '@/components/CMSLink'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { MediaTextBlock as MediaTextBlockType } from '@/payload-types'

import { isDarkTone, toneToSection } from './SectionHeader'

export function MediaTextBlock({ block }: { block: MediaTextBlockType }) {
  const left = block.mediaPosition === 'left'
  const dark = isDarkTone(block.tone)
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <figure
          data-reveal="mask"
          className={cn(
            'relative aspect-[4/5] overflow-hidden rounded-lg lg:col-span-6',
            left ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <Media media={block.media} fill sizes="(min-width: 1024px) 50vw, 100vw" />
        </figure>
        <div
          className={cn(
            'flex flex-col gap-6 lg:col-span-5',
            left ? 'lg:order-2 lg:col-start-8' : 'lg:order-1',
          )}
        >
          {block.eyebrow ? <Eyebrow data-reveal>{block.eyebrow}</Eyebrow> : null}
          {block.heading ? (
            <Heading size="h2" data-reveal>
              {block.heading}
            </Heading>
          ) : null}
          <div data-reveal>
            <RichText data={block.body} className={cn(dark && '[&_a]:text-white')} />
          </div>
          {block.links?.length ? (
            <div data-reveal className="flex flex-wrap gap-3 pt-2">
              {(block.links as LinkData[]).map((l, i) => (
                <CMSLink key={i} link={l} tone={dark ? 'dark' : 'light'} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
