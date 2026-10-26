import { Container, Section } from '@quarau/ui'

import type { MapBlock as MapBlockType } from '@/payload-types'

import { MapEmbed } from './MapEmbed'
import { SectionHeader, toneToSection } from './SectionHeader'

export function MapBlock({ block }: { block: MapBlockType }) {
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <SectionHeader eyebrow={block.eyebrow} heading={block.heading} className="mb-0 lg:mb-0" />
          {block.address ? (
            <address className="text-lg whitespace-pre-line not-italic">{block.address}</address>
          ) : null}
        </div>
        <div className="lg:col-span-8">
          <MapEmbed
            lat={block.lat}
            lng={block.lng}
            zoom={block.zoom ?? 13}
            label={block.heading ?? 'Mapa'}
          />
        </div>
      </Container>
    </Section>
  )
}
