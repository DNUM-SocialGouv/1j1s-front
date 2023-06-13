import type{ Meta,StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta:Meta<typeof TextArea>={
	component:TextArea,
	title:'Components/Form/TextArea',
};
export default meta; 

type Story= StoryObj<typeof TextArea>;


export const Example: Story={
	args: {
		label: 'Descriptif de l´offre',
	},
};
