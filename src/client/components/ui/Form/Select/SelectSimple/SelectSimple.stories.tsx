import { Meta, StoryObj } from '@storybook/react';
import { SelectSimple } from './SelectSimple';

const meta: Meta<typeof SelectSimple> = {
	argTypes: {
		children: {
			control: 'array',
		},
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
	},
	component: SelectSimple,
	title: 'Components/Form/Select/SelectSimple',
};

export default meta;
type Story = StoryObj<typeof SelectSimple>;
export const exemple: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<SelectSimple id="pays" {...args}>
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
				{children.map((child) => <SelectSimple.Option value={child} key={child}>{child}</SelectSimple.Option>)}
			</SelectSimple>
		</>
	),
};
