import type { Meta, StoryObj } from '@storybook/react';

import Marked from './Marked';

const meta: Meta<typeof Marked> = {
	component: Marked,
	title: 'Components/Marked',
};

export default meta;
type Story = StoryObj<typeof Marked>;

export const Example: Story = {
	args: {
		markdown: `# Composant Markdown
Ceci est un exemple de markdown transformé en HTML via le composant Markdown`,
	},
};

