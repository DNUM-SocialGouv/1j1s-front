import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	title: 'Components/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Example: Story = {
	args: {
		label: 'Cliquez ici ',
	},
};

