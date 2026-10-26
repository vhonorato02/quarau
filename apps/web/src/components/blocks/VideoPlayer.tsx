'use client'

import { cn } from '@quarau/ui'
import { useRef, useState } from 'react'

/**
 * Click-to-play video. Nothing (not even third-party embeds) loads before the
 * user asks for it: faster pages and no tracking without consent.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  embed,
  className,
}: {
  src: string
  poster?: string | null
  title: string
  embed?: boolean
  className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <div
      data-reveal="mask"
      className={cn('bg-ink relative aspect-video overflow-hidden rounded-lg', className)}
    >
      {playing ? (
        embed ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 size-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            ref={ref}
            src={src}
            poster={poster ?? undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full"
          >
            <track kind="captions" />
          </video>
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 grid place-items-center text-white"
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
          ) : !embed ? (
            <video
              src={`${src}#t=2`}
              preload="metadata"
              muted
              playsInline
              className="absolute inset-0 size-full object-cover opacity-80"
              aria-hidden="true"
            />
          ) : null}
          <span className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />
          <span className="shadow-lift relative grid size-24 place-items-center rounded-full bg-white/95 text-blue-700 transition-transform duration-(--duration-base) group-hover:scale-110 md:size-28">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-9" fill="currentColor">
              <path d="M7 4.5v15l13-7.5-13-7.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
