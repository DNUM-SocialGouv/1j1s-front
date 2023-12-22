import { Meta, StoryObj } from '@storybook/react';
import { ComponentPropsWithoutRef } from 'react';

import { Label } from '../Label';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	component: Input,
	title: 'Components/Form/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;
export const exemple: Story = {
	args: {},
	render: (args) => (
		<>
			<Label htmlFor="pays">Pays</Label>
			<Input id="pays" {...args} />
		</>
	),
};

export const disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<>
			<Label htmlFor="pays">Pays</Label>
			<Input id="pays" {...args} />
		</>
	),
};

export const withValidation: Story = {
	args: {
		validation: (value: ComponentPropsWithoutRef<typeof Input>['value']) =>
			(typeof value === 'string' && value === 'France') ? '' : 'Entrer "France"',
	},
	render: (args) => (
		<>
			<Label htmlFor="pays">Pays (Entrer France)</Label>
			<Input id="pays" {...args}/>
		</>
	),
};
