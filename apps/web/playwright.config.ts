import { defineConfig, devices } from '@playwright/test'

/**
 * E2E against a running production build (CI starts the standalone server).
 *   E2E_BASE_URL=http://localhost:3100 pnpm test:e2e
 * Visual regression runs only with VISUAL=1 (inside the official Playwright Docker image for stable pixels).
 */
const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3100'
const launchOptions = process.env.PW_CHROMIUM_PATH
  ? { executablePath: process.env.PW_CHROMIUM_PATH }
  : {}

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    launchOptions,
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      dependencies: ['setup'],
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], launchOptions },
      dependencies: ['setup'],
      testMatch: /(routes|navigation|a11y)\.spec\.ts/,
    },
    ...(process.env.VISUAL
      ? [
          {
            name: 'visual',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
            testMatch: /visual\.spec\.ts/,
          },
        ]
      : []),
  ],
})
