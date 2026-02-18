import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
	component: Accordion,
	title: 'Components/Accordion',
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Example: Story = {
	args: {
		children:<p>Je suis un enfant</p>,
		open: true,
		summary: 'titre',
		summaryAs: 'h2',
	},
};
