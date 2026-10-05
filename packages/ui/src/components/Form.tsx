import * as React from 'react'

import { cn } from '../lib/cn'

const control =
  'block w-full rounded-md border border-line-strong bg-surface px-4 text-base text-ink transition-colors placeholder:text-ink-subtle hover:border-ink-muted focus-visible:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-0 aria-[invalid=true]:border-danger'

export interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: (props: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    required?: boolean
  }) => React.ReactNode
}

/** Accessible form field wrapper: label, hint and error wired via ARIA. */
export function Field({ id, label, hint, error, required, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-subtle"> (opcional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, required })}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(control, 'h-12', className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(control, 'min-h-40 py-3 leading-relaxed', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select ref={ref} className={cn(control, 'h-12 appearance-none bg-no-repeat pr-10', className)} {...props} />
  ),
)
Select.displayName = 'Select'

export function Checkbox({
  id,
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: React.ReactNode }) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border-line-strong accent-blue-700"
        {...props}
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-ink-muted">
        {label}
      </label>
    </div>
  )
}
