import type { Meta, StoryObj } from '@storybook/react';

import { Tuile } from './Tuile';

const meta: Meta<typeof Tuile> = {
	component: Tuile,
	title: 'Components/Tuile',
};

export default meta;
type Story = StoryObj<typeof Tuile>;

export const Example: Story = {
	args: {
		children: 'La Tuile peut prendre du texte en children',
		iconName: 'account',
	},
};

