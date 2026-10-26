import type * as React from 'react'

/** Line icons for the practice areas, drawn on the brand's stroke weight. */
export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  const icons: Record<string, React.ReactNode> = {
    territory: (
      <>
        <path d="M3 20c3-4 6-6 9-6s6 2 9 6" {...common} />
        <path d="M12 14V4m0 0c-2 2-4 2.5-6 2m6-2c2 2 4 2.5 6 2" {...common} />
      </>
    ),
    heritage: (
      <>
        <path d="M3 9 12 4l9 5M5 9v9m4.7-9v9m4.6-9v9M19 9v9M3 20h18" {...common} />
      </>
    ),
    education: (
      <>
        <path d="M3 8l9-4 9 4-9 4-9-4Z" {...common} />
        <path d="M7 10v5c1.5 1.3 3 2 5 2s3.5-.7 5-2v-5M21 8v6" {...common} />
      </>
    ),
    management: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" {...common} />
        <path d="m15.5 15.5 5 5" {...common} />
        <path d="M8 10.5h5M10.5 8v5" {...common} />
      </>
    ),
    diffusion: (
      <>
        <path d="M4 10v4h3l5 4V6L7 10H4Z" {...common} />
        <path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11" {...common} />
      </>
    ),
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      {icons[name ?? 'territory'] ?? icons.territory}
    </svg>
  )
}
