import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
	args: {
		isLoading: true,
	},
	component: Skeleton,
	title: 'Components/Loader/Skeleton',
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Card: Story = {
	args: {
		type: 'card',
	},
};

export const Tag: Story = {
	args: {
		type: 'tag',
	},
};

export const Line: Story = {
	args: {
		type: 'line',
	},
};


