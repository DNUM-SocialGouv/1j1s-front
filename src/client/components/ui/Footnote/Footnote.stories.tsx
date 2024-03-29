import type{ Meta,StoryObj } from '@storybook/react';

import { Footnote } from './Footnote';

const meta:Meta<typeof Footnote>={
	component:Footnote,
	title:'Components/Footnote',
};

export default meta;
type Story = StoryObj<typeof Footnote>;

export const Example: Story ={
	args: {
		children:<p>{'Note de pied de page'}</p>,
		htmlFor: 'string',
		id: 'string',
	},
};
