import { Meta, StoryObj } from '@storybook/react';

import { Combobox } from '~/client/components/ui/Form/Combobox';

import { Input } from '../Input';
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
			<Champ.Label>Pays</Champ.Label>
			<Champ.Input render={Input} />
		</Champ>
	),
};

export const Required: Story = {
	args: {},
	render: (args) => {
		return(
			<Champ {...args}>
				<Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>
				<Champ.Input render={Input} defaultValue="France" required={true}/>
				<Champ.Error/>
			</Champ>);
	},
};

export const Indication: Story = {
	args: {},
	render: (args) => (
		<Champ {...args}>
			<Champ.Label>Pays</Champ.Label>
			<Champ.Input render={Input} />
			<Champ.Hint>e.g. France</Champ.Hint>
		</Champ>
	),
};
export const IndicationEtErreur: Story = {
	args: {},
	render: (args) => (
		<Champ {...args}>
			<Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>
			<Champ.Input render={Input} defaultValue="France" required validation={() => 'toot'} />
			<Champ.Error/>
			<Champ.Hint>e.g. France</Champ.Hint>
		</Champ>
	),
};

export const ComposantNonInput: Story = {
	args: {},
	render: (args) => {
		return(
			<Champ {...args}>
				<Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>
				<Champ.Input render={Combobox} aria-label="Pays" required={true}>
					<Combobox.Option>France</Combobox.Option>
					<Combobox.Option>Allemagne</Combobox.Option>
					<Combobox.Option>Suisse</Combobox.Option>
					<Combobox.Option>Norvège</Combobox.Option>
					<Combobox.Option>Espagne</Combobox.Option>
					<Combobox.Option>Italie</Combobox.Option>
				</Champ.Input>
				<Champ.Error/>
			</Champ>);
	},
};

export const ComposantInputAvecValidationCustom: Story = {
	args: {},
	render: (args) => (
		<Champ {...args}>
			<Champ.Label>Pays <Champ.Label.Complement>(entrer &ldquo;France&rdquo;)</Champ.Label.Complement></Champ.Label>
			<Champ.Input render={Input} required validation={(value) => value === 'France' ? '' : 'Entrer "France"'} />
			<Champ.Error/>
			<Champ.Hint>e.g. France</Champ.Hint>
		</Champ>
	),
};

