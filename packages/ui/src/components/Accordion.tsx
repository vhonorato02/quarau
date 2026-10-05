'use client'

import { Accordion as A } from 'radix-ui'
import * as React from 'react'

import { cn } from '../lib/cn'

export interface AccordionItemData {
  id: string
  question: string
  answer: React.ReactNode
}

export function Accordion({ items, className }: { items: AccordionItemData[]; className?: string }) {
  return (
    <A.Root type="multiple" className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => (
        <A.Item key={item.id} value={item.id}>
          <A.Header asChild>
            <h3>
              <A.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-h4 font-medium transition-colors hover:text-blue-700">
                {item.question}
                <span
                  aria-hidden="true"
                  className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-blue-700"
                >
                  <span className="absolute h-0.5 w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-0.5 bg-current transition-transform duration-(--duration-base) group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                </span>
              </A.Trigger>
            </h3>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-[collapse_var(--duration-base)_var(--ease-brand)] data-[state=open]:animate-[expand_var(--duration-base)_var(--ease-brand)]">
            <div className="prose-quarau pb-8 text-ink-muted">{item.answer}</div>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  )
}
