import type { Meta, StoryObj } from '@storybook/nextjs';
import { ComponentPropsWithoutRef } from 'react';

import { Champ } from '../Champ/Champ';
import { Label } from '../Label';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	component: TextArea,
	title: 'Components/Form/TextArea',
};
export default meta;

type Story = StoryObj<typeof TextArea>;


export const exemple: Story = {
	args: {},
	render: (args) => (
		<>
			<Label htmlFor="description">Description (entre 10 et 20 caractères)</Label>
			<TextArea id="description" {...args} minLength={10} maxLength={20} />
		</>
	),
};

export const disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<>
			<Label htmlFor="description">Description</Label>
			<TextArea id="description" {...args} />
		</>
	),
};

export const withValidation: Story = {
	args: {
		validation: (value: ComponentPropsWithoutRef<typeof TextArea>['value']) =>
			(typeof value === 'string' && value.includes('France')) ? '' : 'Entrer une description qui contient le mot "France"',
	},
	render: (args) => (
		<>
			<Champ>
				<Champ.Label>Description de la France (doit contenir le mot &quot;France&quot;)</Champ.Label>
				<Champ.Input render={TextArea} {...args} />
				<Champ.Error />
			</Champ>
		</>
	),
};
