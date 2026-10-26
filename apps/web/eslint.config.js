import nextPlugin from '@next/eslint-plugin-next'
import { createConfig } from '@quarau/config/eslint'

export default [
  ...createConfig({ ignores: ['src/app/(payload)/**', 'next-env.d.ts', 'src/migrations/**'] }),
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
