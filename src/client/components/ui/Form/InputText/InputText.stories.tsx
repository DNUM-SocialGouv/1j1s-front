import type { Meta, StoryObj } from '@storybook/react';

import { InputText } from './InputText';

const meta: Meta<typeof InputText> = {
	component:InputText,
	title:'Components/InputText',
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Example: Story = {
	args:{
		Label:"C'est un champ texte",
		hint:'',
		label:'',
		necessity:'',
		validation:'',
		value:'',
	},
};
