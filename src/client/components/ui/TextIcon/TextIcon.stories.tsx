import type { Meta, StoryObj } from '@storybook/react';

import { TextIcon } from './TextIcon';

const meta: Meta<typeof TextIcon> = {
	component: TextIcon,
	title: 'Components/TextIcon',
};

export default meta;
type Story = StoryObj<typeof TextIcon>;

export const Example: Story = {
	args: {
		children: "Contacter l'agence",
		icon: 'mail',
	},
};

