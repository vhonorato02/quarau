import '@fontsource/barlow/300.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '../src/styles/index.css'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
    options: { storySort: { order: ['Fundamentos', 'Componentes'] } },
  },
  tags: ['autodocs'],
}

export default preview
