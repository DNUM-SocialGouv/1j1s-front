import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { SelectSimple } from './SelectSimple';

const meta: Meta<typeof SelectSimple> = {
	argTypes: {
		children: {
			control: 'object',
		},
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
		optionsAriaLabel: 'Pays',
	},
	component: SelectSimple,
	title: 'Components/Form/Select/SelectSimple',
};

export default meta;
type Controls = Omit<React.ComponentPropsWithRef<typeof SelectSimple>, 'children'> & { children: string[] };
type Story = StoryObj<Controls>;
export const exemple: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<SelectSimple id="pays" {...args}>
				<SelectSimple.Option value="">Aucun</SelectSimple.Option>
				{children.map((child) => <SelectSimple.Option value={child} key={child}>{child}</SelectSimple.Option>)}
			</SelectSimple>
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
			<SelectSimple id="pays" {...args}>
				<SelectSimple.Option value="">Aucun</SelectSimple.Option>
				{children.map((child) => <SelectSimple.Option value={child} key={child}>{child}</SelectSimple.Option>)}
			</SelectSimple>
		</>
	),
};
