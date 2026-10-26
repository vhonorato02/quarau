import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
    // Integration tests (real Postgres) run separately: pnpm test:int
    exclude: ['tests/int/**', 'tests/e2e/**', 'node_modules/**'],
    server: { deps: { inline: ['@quarau/ui'] } },
  },
})
