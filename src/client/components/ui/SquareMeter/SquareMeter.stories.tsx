import type { Meta, StoryObj } from '@storybook/nextjs';

import { SquareMeter } from './SquareMeter';

const meta: Meta<typeof SquareMeter> = {
	component: SquareMeter,
	title: 'Components/SquareMeter',
};

export default meta;
type Story = StoryObj<typeof SquareMeter>;

export const Example: Story = {
};

