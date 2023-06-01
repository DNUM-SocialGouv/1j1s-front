import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from './Tab';

const meta: Meta<typeof Tab> = {
	component: Tab,
	title: 'Components/Tabs/Tab',
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Example: Story = {
	args: {
		children: 'Ceci est un tag',
	},
};

