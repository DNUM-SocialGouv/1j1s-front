import type{ Meta,StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta:Meta<typeof TextArea>={
	component:TextArea,
	title:'Components/TextArea',
};
export default meta; 

type Story= StoryObj<typeof TextArea>;


export const Example:Story={
	args:{
		ValidationMessage:"C'est un text",
		setCustomValidity:'Message',
		value:'string',
	},
};
