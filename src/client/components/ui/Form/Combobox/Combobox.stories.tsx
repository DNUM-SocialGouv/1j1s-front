import { Meta, StoryObj } from '@storybook/react';

import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
	argTypes: {
		children: {
			control: 'array',
		},
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne'],
		disabled: false,
	},
	component: Combobox,
	title: 'Components/Combobox',
};

export default meta;
type Story = StoryObj<typeof Combobox>;
export const story: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<Combobox {...args}>
			{children.map((child, index) => <Combobox.Option key={index}>{child}</Combobox.Option>)}
		</Combobox>
	),
};
