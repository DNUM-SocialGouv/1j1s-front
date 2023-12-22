import { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
	component: Label,
	title: 'Components/Form/Label',
};

export default meta;
type Story = StoryObj<typeof Label>;
export const exemple: Story = {
	args: {},
	render: (args) => (
		<>
			<Label htmlFor="inputId" {...args}>Je suis le label</Label>
			<Input id="inputId"/>
		</>
	),
};
