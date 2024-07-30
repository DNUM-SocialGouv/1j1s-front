import { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label';
import { InputWithUnit } from './InputWithUnit';

const meta: Meta<typeof InputWithUnit> = {
	component: InputWithUnit,
	title: 'Components/Form/InputWithUnit',
};

export default meta;
type Story = StoryObj<typeof InputWithUnit>;
export const exemple: Story = {
	args: {
		nomDeLUnite: 'Euro',
		unite: '€',
	},
	render: (args) => (
		<>
			<Label htmlFor="prix">Prix</Label>
			<InputWithUnit id="prix"  {...args} />
		</>
	),
};
