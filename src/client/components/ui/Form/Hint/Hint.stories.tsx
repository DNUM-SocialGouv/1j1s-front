import { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { Label } from '../Label';
import { Hint } from './Hint';

const meta: Meta<typeof Hint> = {
	component: Hint,
	title: 'Components/Form/Hint',
};

export default meta;
type Story = StoryObj<typeof Hint>;
export const exemple: Story = {
	args: {},
	render: (args) => (
		<>
			<Label htmlFor="pays">Pays</Label>
			<Input id="pays" aria-describedby="hint"/>
			<Hint id='hint' {...args}>Je suis l‘indication</Hint>
		</>
	),
};
