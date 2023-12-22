import { Meta, StoryObj } from '@storybook/react';

import { Input } from '../Input';
import { Label } from '../Label';
import { Error } from './Error';

const meta: Meta<typeof Error> = {
	component: Error,
	title: 'Components/Form/Error',
};

export default meta;
type Story = StoryObj<typeof Error>;
export const exemple: Story = {
	args: {},
	render: (args) => (
		<>
			<Label htmlFor="pays">Pays</Label>
			<Input id="pays" aria-describedby="error"/>
			<Error id='error' {...args}>Je suis l‘erreur</Error>
		</>
	),
};
