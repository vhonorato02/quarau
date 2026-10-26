import { isMedia, mediaSrc } from '@/components/Img'
import { getTexts } from '@/server/queries'

import { VideoClient } from './VideoClient'
import type { BlockOf } from './types'

/** Self-hosted MP4 behind a poster: nothing is downloaded until the visitor presses play. */
export async function Video({ block }: { block: BlockOf<'video'> }) {
  if (!isMedia(block.video) || !block.video.url) return null
  const t = await getTexts()
  const poster = mediaSrc(block.poster, 'lg')
  return (
    <figure className="q-wrap q-video">
      <VideoClient
        src={mediaSrc(block.video) ?? block.video.url}
        poster={poster}
        type={block.video.mimeType ?? 'video/mp4'}
        label={t.video.play}
        alt={isMedia(block.poster) ? (block.poster.alt ?? '') : ''}
      />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  )
}
