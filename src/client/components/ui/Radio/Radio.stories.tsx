import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
	component: Radio,
	title: 'Components/Form/Radio',
};
export default meta;

type Story = StoryObj<typeof Radio>;


export const Example: Story = {
	args: {
		label: 'Stage',
	},
};
