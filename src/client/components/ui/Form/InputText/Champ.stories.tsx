import { Meta, StoryObj } from '@storybook/react';

import { Champ } from './Champ';

const meta: Meta<typeof Champ> = {
	component: Champ,
	title: 'Components/Form/Champ',
};

export default meta;
type Story = StoryObj<typeof Champ>;
export const exemple: Story = {
	args: {},
	render: (args) => (
		<Champ {...args}>
			<Champ.Label htmlFor="pays">Pays <Champ.Label.Complement>(Un pays Européen)</Champ.Label.Complement></Champ.Label>
			<Champ.Input id="pays"/>
		</Champ>
	),
};

export const Erreur: Story = {
	args: {},
	render: (args) => (
		<Champ {...args}>
			<Champ.Label htmlFor="pays">Pays <Champ.Label.Complement>(Un pays Européen)</Champ.Label.Complement></Champ.Label>
			<Champ.Input id="pays"/>
			<Champ.Error>Vous n‘avez pas fourni un pays valide</Champ.Error>
		</Champ>
	),
};
