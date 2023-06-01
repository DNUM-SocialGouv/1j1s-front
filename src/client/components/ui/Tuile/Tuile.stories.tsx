import type { Meta, StoryObj } from '@storybook/react';

import { Tuile } from './Tuile';

const meta: Meta<typeof Tuile> = {
	component: Tuile,
	title: 'Components/Tuile',
	argTypes: {
		children: { control: 'text' },
	},

};

export default meta;
type Story = StoryObj<typeof Tuile>;

export const Example: Story = {
	args: {
		iconName: 'account',
		children: 'La Tuile peut prendre du texte en children',
	},
};

