import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
	component: Pagination,
	title: 'Components/Pagination',
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Example: Story = {
	args: {
		numberOfResult: 56,
		numberOfResultPerPage: 10,
	},
};

