// Shared flat ESLint config for the Quarau monorepo.
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @param {{ ignores?: string[] }} [options] */
export function createConfig(options = {}) {
  return tseslint.config(
    {
      ignores: [
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/storybook-static/**',
        '**/coverage/**',
        '**/playwright-report/**',
        '**/test-results/**',
        '**/payload-types.ts',
        '**/migrations/**',
        '**/importMap.js',
        ...(options.ignores ?? []),
      ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
    {
      plugins: { 'react-hooks': reactHooks },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
    {
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      },
    },
    prettier,
  )
}

export default createConfig()
