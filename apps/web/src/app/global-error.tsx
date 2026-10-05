'use client'

/** Last-resort error boundary (root layout failed). Kept dependency-free. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#04263a', color: '#fff' }}>
        <main style={{ maxWidth: 560, padding: 24 }}>
          <p style={{ color: '#39b54a', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', fontSize: 13 }}>Erro 500</p>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: '12px 0' }}>Algo saiu do esperado.</h1>
          <p style={{ opacity: 0.8, fontSize: 18 }}>Tivemos um problema temporário. Tente novamente em instantes.</p>
          <button onClick={reset} style={{ marginTop: 24, padding: '14px 28px', borderRadius: 999, border: 0, background: '#fff', color: '#0e1a24', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  )
}
