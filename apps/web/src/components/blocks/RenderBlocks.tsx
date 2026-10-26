import { ContactForm } from './ContactForm'
import {
  Cycle,
  Figure,
  MediaText,
  Ods,
  ProofNumber,
  Publications,
  Quote,
  RichTextBlock,
} from './Content'
import { Gallery } from './Gallery'
import { HeroLens, PageIntro } from './Hero'
import { ProjectIndex } from './Projects'
import { Areas, CtaBand, NewsList, PartnersStrip } from './Sections'
import type { AnyBlock, BlockContext } from './types'
import { Video } from './Video'

/** Sections that bring their own vertical rhythm (band backgrounds or q-section). */
const SELF_SPACED = new Set([
  'heroLens',
  'pageIntro',
  'partnersStrip',
  'projectIndex',
  'cycle',
  'areas',
  'ctaBand',
  'contactForm',
  'newsList',
])

function Block({ block, index, ctx }: { block: AnyBlock; index: number; ctx: BlockContext }) {
  switch (block.blockType) {
    case 'heroLens':
      return <HeroLens block={block} />
    case 'pageIntro':
      return <PageIntro block={block} ctx={ctx} />
    case 'partnersStrip':
      return <PartnersStrip block={block} index={index} />
    case 'projectIndex':
      return <ProjectIndex block={block} index={index} />
    case 'proofNumber':
      return <ProofNumber block={block} />
    case 'cycle':
      return <Cycle block={block} index={index} />
    case 'areas':
      return <Areas block={block} index={index} />
    case 'richText':
      return <RichTextBlock block={block} index={index} />
    case 'mediaText':
      return <MediaText block={block} index={index} />
    case 'quote':
      return <Quote block={block} />
    case 'figure':
      return <Figure block={block} />
    case 'gallery':
      return <Gallery block={block} index={index} />
    case 'video':
      return <Video block={block} />
    case 'publications':
      return <Publications block={block} index={index} />
    case 'ods':
      return <Ods block={block} index={index} />
    case 'ctaBand':
      return <CtaBand block={block} index={index} />
    case 'contactForm':
      return <ContactForm block={block} index={index} />
    case 'newsList':
      return <NewsList block={block} index={index} />
    default:
      return null
  }
}

/**
 * Page body: consecutive "content" blocks (text, photo, quote…) share one section with an even
 * rhythm; band blocks (cycle, contact…) stand alone.
 */
export function RenderBlocks({
  blocks,
  ctx,
  flow = false,
}: {
  blocks: AnyBlock[] | null | undefined
  ctx: BlockContext
  flow?: boolean
}) {
  if (!blocks?.length) return null
  if (flow) {
    return (
      <div className="q-story-blocks">
        {blocks.map((b, i) => (
          <Block key={b.id ?? i} block={b} index={i} ctx={ctx} />
        ))}
      </div>
    )
  }
  const groups: Array<{ self: boolean; items: Array<{ b: AnyBlock; i: number }> }> = []
  blocks.forEach((b, i) => {
    const self = SELF_SPACED.has(b.blockType)
    const last = groups.at(-1)
    if (!self && last && !last.self) last.items.push({ b, i })
    else groups.push({ self, items: [{ b, i }] })
  })
  return (
    <>
      {groups.map((g) =>
        g.self ? (
          <Block
            key={g.items[0]!.b.id ?? g.items[0]!.i}
            block={g.items[0]!.b}
            index={g.items[0]!.i}
            ctx={ctx}
          />
        ) : (
          <div key={g.items[0]!.b.id ?? g.items[0]!.i} className="q-section q-story-blocks">
            {g.items.map(({ b, i }) => (
              <Block key={b.id ?? i} block={b} index={i} ctx={ctx} />
            ))}
          </div>
        ),
      )}
    </>
  )
}
