import { Container, Section, cn } from '@quarau/ui'

import { isMedia } from '@/components/Media'
import type { GalleryBlock as GalleryBlockType, Media as MediaDoc } from '@/payload-types'

import { GalleryGrid } from './GalleryGrid'
import { SectionHeader, toneToSection } from './SectionHeader'

export function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const images = (block.images ?? []).filter(isMedia) as MediaDoc[]
  if (!images.length) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
      </Container>
      <div className={cn(block.layout === 'carousel' ? '' : 'container-site')}>
        <GalleryGrid images={images} layout={block.layout === 'carousel' ? 'carousel' : 'mosaic'} />
      </div>
    </Section>
  )
}
