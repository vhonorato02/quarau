'use client'

import { Button, Container, Heading } from '@quarau/ui'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section className="pt-[calc(var(--header-h)+6rem)] pb-(--spacing-section)">
      <Container className="flex max-w-3xl flex-col gap-8">
        <p className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-blue-700 uppercase">
          Erro 500
        </p>
        <Heading as="h1" size="h1" dot>
          Algo saiu do esperado
        </Heading>
        <p className="text-lead text-ink-muted">
          Tivemos um problema ao carregar esta página. Tente novamente em instantes.
        </p>
        {error.digest ? <p className="text-ink-subtle text-sm">Código: {error.digest}</p> : null}
        <Button onClick={reset} size="lg" className="self-start">
          Tentar novamente
        </Button>
      </Container>
    </section>
  )
}
