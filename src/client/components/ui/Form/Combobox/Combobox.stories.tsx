import { Meta, StoryObj } from '@storybook/react';

import { ButtonComponent } from '../../Button/ButtonComponent';
import { Icon } from '../../Icon/Icon';
import { InputText } from '../InputText/InputText';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
	argTypes: {
		children: {
			control: 'array',
		},
		value: { type: 'string' },
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
		disabled: false,
		readOnly: false,
		value: undefined,
	},
	component: Combobox,
	title: 'Components/Combobox',
};

export default meta;
type Story = StoryObj<typeof Combobox>;
export const exemple: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<Combobox id="pays" {...args}>
				{children.map((child, index) => <Combobox.Option key={index}>{child}</Combobox.Option>)}
			</Combobox>
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
			<Combobox id="pays" {...args}>
				{children.map((child, index) => <Combobox.Option key={index}>{child}</Combobox.Option>)}
			</Combobox>
		</>
	),
};

export const intégrationDansUnFormulaire: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<form
			onSubmit={(event) => { event.preventDefault(); alert('form submitted'); }}
			style={{ display: 'grid', gap: '2ch', gridTemplateColumns: '1fr 1fr' }}
		>
			<label>
				Mot clé
				<InputText readOnly value="Informatique" />
			</label>
			<label htmlFor="localisation">
				Localisation
				<Combobox id="localisation" name="localisation" {...args}>
					{children.map((child, index) => <Combobox.Option key={index}>{child}</Combobox.Option>)}
				</Combobox>
			</label>
			<label htmlFor="domaine">
				Domaine
				<Combobox id="domaine" name="domaine" readOnly value="Informatique" />
			</label>
			<label htmlFor="domaine">
				Durée
				<Combobox id="domaine" name="domaine" readOnly value="6 Mois" />
			</label>
			<ButtonComponent label="Rechercher" icon={<Icon name="magnifying-glass" />} iconPosition="left">Rechercher</ButtonComponent>
		</form>
	),
};
