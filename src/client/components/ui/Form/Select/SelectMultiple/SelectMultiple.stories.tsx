import { Meta, StoryObj } from '@storybook/react';
import { SelectMultiple } from './SelectMultiple';

const meta: Meta<typeof SelectMultiple> = {
	argTypes: {
		children: {
			control: 'array',
		},
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
	},
	component: SelectMultiple,
	title: 'Components/Form/Select/SelectMultiple',
};

export default meta;
type Story = StoryObj<typeof SelectMultiple>;
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
