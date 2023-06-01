import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
	title: 'Components/Tooltip',
	argTypes: {
		children: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
	args: {
		icon: 'information',
		ariaLabel: 'Afficher des explications complémentaires',
		children: 'Voici des explications complémentaires',
	},
};

