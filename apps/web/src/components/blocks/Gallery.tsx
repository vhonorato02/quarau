import { fill } from '@/cms/globals/site-texts'
import { isMedia, mediaSrc } from '@/components/Img'
import { getTexts } from '@/server/queries'

import { GalleryClient, type GalleryImage } from './GalleryClient'
import { type BlockOf, headingId } from './types'

/** Mosaic of the first five photos + "see all" in a full-screen viewer. */
export async function Gallery({ block, index }: { block: BlockOf<'gallery'>; index: number }) {
  const t = await getTexts()
  const images: GalleryImage[] = (block.images ?? []).filter(isMedia).flatMap((m) => {
    const thumb = mediaSrc(m, 'md')
    const full = mediaSrc(m, 'xl') ?? mediaSrc(m)
    return thumb && full
      ? [
          {
            id: m.id,
            thumb,
            full,
            alt: m.alt ?? '',
            caption: m.caption ?? null,
            width: m.width ?? 1600,
            height: m.height ?? 1067,
            focal: `${m.focalX ?? 50}% ${m.focalY ?? 50}%`,
          },
        ]
      : []
  })
  if (!images.length) return null
  const id = headingId(block, index)
  return (
    <section className="q-wrap" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <h2 id={id} className="q-h3 mb-6">
          {block.heading}
        </h2>
      ) : null}
      <GalleryClient
        images={images}
        labels={{
          seeAll: fill(t.gallery.seeAll, { n: images.length }),
          close: t.gallery.close,
          previous: t.gallery.previous,
          next: t.gallery.next,
          counter: t.gallery.counter,
          dialog: t.gallery.dialogLabel,
        }}
      />
    </section>
  )
}
