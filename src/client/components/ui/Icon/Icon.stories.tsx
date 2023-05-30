import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
	component: Icon,
	title: 'Components/Icon',
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Example: Story = {
	args: {
		name: 'microwave',
	},
};

