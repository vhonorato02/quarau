'use client'

import { Dialog } from 'radix-ui'
import * as React from 'react'

import { cn } from '../lib/cn'

export const Sheet = Dialog.Root
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close

export function SheetContent({
  title,
  description,
  className,
  children,
}: {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-ink/50 fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-[fade-in_var(--duration-base)_var(--ease-brand)]" />
      <Dialog.Content
        className={cn(
          'shadow-lift fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-blue-950 text-white outline-none',
          'data-[state=open]:animate-[slide-in-right_var(--duration-slow)_var(--ease-brand)]',
          className,
        )}
      >
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        {description ? (
          <Dialog.Description className="sr-only">{description}</Dialog.Description>
        ) : (
          <Dialog.Description className="sr-only">{title}</Dialog.Description>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
