import type { Meta, StoryObj } from '@storybook/react';

import { FoldingSection } from './FoldingSection';


const meta: Meta<typeof FoldingSection> = {
	component: FoldingSection,
	title: 'Components/FoldingSection',
};

export default meta;

type Story = StoryObj<typeof FoldingSection>;

export const Example: Story = {
	args: {
		children: <h2>Je suis le contenu</h2>,
		summary: 'Je suis le titre',
	},
};
