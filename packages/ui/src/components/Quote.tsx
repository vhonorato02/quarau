import * as React from 'react'

import { cn } from '../lib/cn'

export function Quote({
  quote,
  author,
  role,
  className,
}: {
  quote: string
  author?: string
  role?: string
  className?: string
}) {
  return (
    <figure className={cn('flex flex-col gap-8', className)}>
      <svg aria-hidden="true" viewBox="0 0 48 36" className="text-brand-green h-9 w-12">
        <path
          fill="currentColor"
          d="M0 36V22.2C0 9.6 6.6 2.2 18 0l2.2 4.6C13.4 6.6 10.2 11 10 17h9v19H0Zm27 0V22.2C27 9.6 33.6 2.2 45 0l2.2 4.6C40.4 6.6 37.2 11 37 17h9v19H27Z"
        />
      </svg>
      <blockquote className="text-h3 font-medium text-balance">
        <p>{quote}</p>
      </blockquote>
      {author ? (
        <figcaption className="text-base">
          <span className="font-semibold">{author}</span>
          {role ? <span className="block opacity-75">{role}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
