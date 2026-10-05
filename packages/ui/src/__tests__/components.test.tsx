import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OdsChip, OdsList } from '../components/Badge'
import { Button } from '../components/Button'
import { Field, Input } from '../components/Form'
import { Heading } from '../components/Typography'
import { cn } from '../lib/cn'

describe('cn', () => {
  it('merges tailwind classes, last wins', () => {
    const hidden = Math.random() > 2
    expect(cn('px-2', 'px-4', hidden && 'hidden')).toBe('px-4')
  })
})

describe('Button', () => {
  it('defaults to type=button', () => {
    render(<Button>Enviar</Button>)
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'button')
  })
  it('renders child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/contato">Contato</a>
      </Button>,
    )
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '/contato')
  })
})

describe('Heading', () => {
  it('renders the decorative brand dot hidden from assistive tech', () => {
    const { container } = render(<Heading dot>Quarau</Heading>)
    expect(screen.getByRole('heading', { name: 'Quarau' })).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})

describe('ODS', () => {
  it('renders accessible name for a valid goal', () => {
    render(<OdsChip number={4} />)
    expect(screen.getByText(/Educação de qualidade/)).toBeInTheDocument()
    expect(screen.getByText(/ODS 4:/)).toHaveClass('sr-only')
  })
  it('ignores invalid numbers', () => {
    const { container } = render(<OdsList numbers={[0, 18, 99]} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('Field', () => {
  it('wires label, error and aria attributes', () => {
    render(
      <Field id="email" label="E-mail" required error="Informe um e-mail válido.">
        {(p) => <Input {...p} type="email" />}
      </Field>,
    )
    const input = screen.getByLabelText(/E-mail/)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(input).toBeRequired()
    expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido.')
  })
})
