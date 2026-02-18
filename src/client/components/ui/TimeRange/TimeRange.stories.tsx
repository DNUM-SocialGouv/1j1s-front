import type { Meta, StoryObj } from '@storybook/react';

import { TimeRange } from './TimeRange';

const meta: Meta<typeof TimeRange> = {
	component: TimeRange,
	title: 'Components/TimeRange',
};

export default meta;
type Story = StoryObj<typeof TimeRange>;

export const Example: Story = {
	args: {
		end: '19:00:00',
		start: '14:14:14',
	},
};

