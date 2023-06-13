import type { Meta, StoryObj } from '@storybook/react';

import { InputText } from './InputText';

const meta: Meta<typeof InputText> = {
	component:InputText,
	title:'Components/Form/InputText',
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Example: Story = {
	args:{
		label:'Prénom',
	},
};
