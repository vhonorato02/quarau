import type { Locale } from '@/i18n/routing'
import type { Page } from '@/payload-types'

import { ContactFormBlock } from './ContactForm'
import { ContentBlock } from './Content'
import { GalleryBlock } from './Gallery'
import { HeroBlock } from './Hero'
import { MapBlock } from './Map'
import { MediaTextBlock } from './MediaText'
import {
  CtaBlock,
  DownloadsBlock,
  FaqBlock,
  OdsBlock,
  PartnersBlock,
  TeamBlock,
  TestimonialsBlock,
} from './Misc'
import { ProjectsBlock } from './Projects'
import { ServicesBlock } from './Services'
import { StatementBlock } from './Statement'
import { StatsBlock } from './Stats'
import { TimelineBlock } from './Timeline'
import { VideoBlock } from './Video'

type AnyBlock = NonNullable<Page['layout']>[number]

export function RenderBlocks({
  blocks,
  locale,
}: {
  blocks: AnyBlock[] | null | undefined
  locale: Locale
}) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} isFirst={i === 0} />
          case 'statement':
            return <StatementBlock key={key} block={block} />
          case 'content':
            return <ContentBlock key={key} block={block} />
          case 'mediaText':
            return <MediaTextBlock key={key} block={block} priority={i <= 1} />
          case 'stats':
            return <StatsBlock key={key} block={block} />
          case 'timeline':
            return <TimelineBlock key={key} block={block} />
          case 'gallery':
            return <GalleryBlock key={key} block={block} />
          case 'video':
            return <VideoBlock key={key} block={block} />
          case 'projects':
            return <ProjectsBlock key={key} block={block} locale={locale} />
          case 'services':
            return <ServicesBlock key={key} block={block} locale={locale} />
          case 'testimonials':
            return <TestimonialsBlock key={key} block={block} />
          case 'partners':
            return <PartnersBlock key={key} block={block} locale={locale} />
          case 'ods':
            return <OdsBlock key={key} block={block} />
          case 'team':
            return <TeamBlock key={key} block={block} locale={locale} />
          case 'downloads':
            return <DownloadsBlock key={key} block={block} locale={locale} />
          case 'faq':
            return <FaqBlock key={key} block={block} />
          case 'map':
            return <MapBlock key={key} block={block} />
          case 'contactForm':
            return <ContactFormBlock key={key} block={block} locale={locale} />
          case 'cta':
            return <CtaBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
