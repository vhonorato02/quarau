import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowIcon, Button } from '../components/Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Fale com a Quarau' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'inverse', 'outline-inverse', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Primario: Story = {
  render: (args) => (
    <Button {...args}>
      {args.children} <ArrowIcon />
    </Button>
  ),
}
export const Secundario: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const SobreAzul: Story = {
  args: { variant: 'inverse' },
  decorators: [(S) => <div className="bg-brand-blue p-10">{S()}</div>],
}
