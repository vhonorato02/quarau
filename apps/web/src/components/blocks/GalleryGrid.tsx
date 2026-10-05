'use client'

import { cn } from '@quarau/ui'
import { lazy, Suspense, useRef, useState } from 'react'
import type * as React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'

const loadLightbox = () => import('./GalleryLightbox')
const GalleryLightbox = lazy(() => loadLightbox().then((m) => ({ default: m.GalleryLightbox })))

/** Mosaic rhythm: every 7 images form an editorial pattern of large and small tiles. */
const PATTERN = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
  'md:col-span-2',
  'md:col-span-4',
]

export function GalleryGrid({
  images,
  layout = 'mosaic',
}: {
  images: MediaDoc[]
  layout?: 'mosaic' | 'carousel'
}) {
  const [index, setIndex] = useState<number | null>(null)
  // The tile that opened the viewer gets focus back when it closes.
  const opener = useRef<HTMLElement | null>(null)
  const open = (i: number) => (el: HTMLElement) => {
    opener.current = el
    setIndex(i)
  }

  return (
    <>
      {layout === 'carousel' ? (
        <ul
          className="scroller flex gap-4 overflow-x-auto px-(--spacing-gutter) pb-4"
          data-lenis-prevent
        >
          {images.map((img, i) => (
            <li key={img.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[34vw]">
              <Tile img={img} onOpen={open(i)} className="aspect-[4/3]" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid auto-rows-[38vw] grid-cols-2 gap-3 md:auto-rows-[15vw] md:grid-cols-6 md:gap-4 2xl:auto-rows-[13rem]">
          {images.map((img, i) => (
            <li
              key={img.id}
              data-reveal
              style={{ '--reveal-delay': (i % 6) * 60 } as React.CSSProperties}
              className={cn(PATTERN[i % PATTERN.length], i % 7 === 0 && 'col-span-2 row-span-2')}
            >
              <Tile img={img} onOpen={open(i)} className="h-full" />
            </li>
          ))}
        </ul>
      )}

      {index !== null ? (
        <Suspense fallback={null}>
          <GalleryLightbox
            images={images}
            index={index}
            onIndexChange={setIndex}
            returnFocusTo={opener.current}
          />
        </Suspense>
      ) : null}
    </>
  )
}

function Tile({
  img,
  onOpen,
  className,
}: {
  img: MediaDoc
  onOpen: (el: HTMLElement) => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      // Fetch the viewer's code as soon as the visitor shows intent.
      onPointerEnter={loadLightbox}
      onFocus={loadLightbox}
      className={cn(
        'group bg-surface-sunken relative block w-full overflow-hidden rounded-md',
        className,
      )}
      aria-label={`Ampliar imagem: ${img.alt}`}
    >
      <Media
        media={img}
        fill
        sizes="(min-width: 768px) 40vw, 50vw"
        imgClassName="transition-transform duration-[1.2s] ease-(--ease-brand) group-hover:scale-[1.04]"
      />
    </button>
  )
}
