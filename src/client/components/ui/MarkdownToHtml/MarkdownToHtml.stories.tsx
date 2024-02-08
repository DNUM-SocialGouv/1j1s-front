import type { Meta, StoryObj } from '@storybook/react';

import MarkdownToHtml from './MarkdownToHtml';

const meta: Meta<typeof MarkdownToHtml> = {
	component: MarkdownToHtml,
	title: 'Components/Marked',
};

export default meta;
type Story = StoryObj<typeof MarkdownToHtml>;

export const Example: Story = {
	args: {
		markdown: `# Composant Markdown
Ceci est un exemple de markdown transformé en HTML via le composant Markdown`,
	},
};

