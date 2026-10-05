import { Container, Section } from '@quarau/ui'

import { mediaUrl } from '@/components/Media'
import type { VideoBlock as VideoBlockType } from '@/payload-types'

import { SectionHeader, toneToSection } from './SectionHeader'
import { VideoPlayer } from './VideoPlayer'

export function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`
  return null
}

export function VideoBlock({ block }: { block: VideoBlockType }) {
  const src = block.source === 'embed' ? (block.url ? toEmbedUrl(block.url) : null) : mediaUrl(block.file)
  if (!src) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <VideoPlayer
          src={src}
          embed={block.source === 'embed'}
          poster={mediaUrl(block.poster, 'wide')}
          title={block.heading ?? block.caption ?? 'Vídeo'}
        />
        {block.caption ? <p className="mt-4 text-sm opacity-75">{block.caption}</p> : null}
      </Container>
    </Section>
  )
}
