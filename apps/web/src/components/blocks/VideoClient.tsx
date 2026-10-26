'use client'

import { useState } from 'react'

export function VideoClient({
  src,
  poster,
  type,
  label,
  alt,
}: {
  src: string
  poster: string | null
  type: string
  label: string
  alt: string
}) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="q-video__frame">
      {playing ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption -- field videos without speech; captions are added in the CMS when there is dialogue
        <video src={src} poster={poster ?? undefined} controls autoPlay playsInline preload="none">
          <source src={src} type={type} />
        </video>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {poster ? <img src={poster} alt={alt} loading="lazy" decoding="async" /> : null}
          <button type="button" className="q-video__play" onClick={() => setPlaying(true)}>
            <span>{label}</span>
          </button>
        </>
      )}
    </div>
  )
}
