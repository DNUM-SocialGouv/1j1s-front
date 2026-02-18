import { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { ButtonComponent as Button } from '../../../Button/ButtonComponent';
import { Champ } from '../../Champ/Champ';
import { SelectMultiple } from './SelectMultiple';

const meta: Meta<typeof SelectMultiple> = {
	argTypes: {
		children: {
			control: 'object',
		},
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
	},
	component: SelectMultiple,
	title: 'Components/Form/Select/SelectMultiple',
};

export default meta;
type SelectProps = React.ComponentPropsWithRef<typeof SelectMultiple>;
type Controls = Omit<SelectProps, 'children'> & { children: string[] };
type Story = StoryObj<Controls>;

export const exemple: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<SelectMultiple id="pays" {...args}>
				{children.map((child) => <SelectMultiple.Option value={child} key={child}>{child}</SelectMultiple.Option>)}
			</SelectMultiple>
		</>
	),
};

export const disabled: Story = {
	args: {
		disabled: true,
	},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<SelectMultiple id="pays" {...args}>
				{children.map((child) => <SelectMultiple.Option value={child} key={child}>{child}</SelectMultiple.Option>)}
			</SelectMultiple>
		</>
	),
};

export const validation: Story = {
	args: {
		name: 'pays',
		required: true,
	},
	render: ({ children, ...args }) => (
		<form onSubmit={(event) => {
			event.preventDefault();
			alert(Array.from(new FormData(event.currentTarget).entries()));
		}}>
			<Champ>
				<Champ.Label>Pays</Champ.Label>
				<Champ.Input render={SelectMultiple} {...args}>
					{children.map((child) => <SelectMultiple.Option value={child} key={child}>{child}</SelectMultiple.Option>)}
				</Champ.Input>
				<Champ.Error />
			</Champ>
			<Button label="Envoyer" />
		</form>
	),
};

export const defaultValue: Story = {
	args: {
		defaultValue: ['France', 'Japon'],
	},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<SelectMultiple id="pays" {...args}>
				{children.map((child) => <SelectMultiple.Option value={child} key={child}>{child}</SelectMultiple.Option>)}
			</SelectMultiple>
		</>
	),
};
