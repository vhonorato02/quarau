import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

/** Integration tests: real Payload + Postgres (+ Meilisearch when MEILI_HOST is set). */
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['tests/int/**/*.int.test.ts'],
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
})
