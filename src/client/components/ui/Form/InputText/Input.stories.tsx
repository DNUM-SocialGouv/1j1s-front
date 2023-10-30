import { Meta, StoryObj } from '@storybook/react';
import { ComponentPropsWithoutRef } from 'react';

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
			<label htmlFor="pays">Pays</label>
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
			<label htmlFor="pays">Pays</label>
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
			<label htmlFor="pays">Pays (Entrer France)</label>
			<Input id="pays" {...args}/>
		</>
	),
};
