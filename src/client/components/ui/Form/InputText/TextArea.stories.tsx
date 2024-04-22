import type{ Meta,StoryObj } from '@storybook/react';

import { TextAreaDeprecated } from './TextAreaDeprecated';

const meta:Meta<typeof TextAreaDeprecated>={
	component:TextAreaDeprecated,
	title:'Components/Form/TextArea',
};
export default meta; 

type Story= StoryObj<typeof TextAreaDeprecated>;


export const Example: Story={
	args: {
		label: 'Descriptif de l´offre',
	},
};
