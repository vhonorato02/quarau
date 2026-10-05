import { ArrowIcon, Button, Container, Heading } from '@quarau/ui'
import Link from 'next/link'

/** Shown only before the CMS has content (fresh install). */
export function FallbackHome() {
  return (
    <section
      data-hero-dark
      className="on-dark flex min-h-[90svh] items-end bg-blue-950 pb-24 text-white"
    >
      <Container className="flex flex-col gap-8">
        <Heading as="h1" size="display" dot>
          Quarau
        </Heading>
        <p className="text-lead max-w-2xl text-white/85">
          Consultoria em projetos educativos, culturais e socioambientais. O conteúdo deste site
          ainda está sendo carregado no CMS.
        </p>
        <Button asChild variant="inverse" size="lg" className="self-start">
          <Link href="/admin">
            Abrir o painel
            <ArrowIcon />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
