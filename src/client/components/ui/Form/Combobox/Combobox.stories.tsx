import { Meta, StoryObj } from '@storybook/react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';

import { Combobox } from '.';
import styles from './Combobox.stories.module.scss';

const meta: Meta<typeof Combobox> = {
	argTypes: {
		children: {
			control: 'array',
		},
		onBlur: { type: 'function' },
		onFocus: { type: 'function' },
		value: { type: 'string' },
	},
	args: {
		children: ['France', 'Suisse', 'Allemagne', 'Royaume-Uni', 'Espagne', 'Belgique', 'Japon', 'Australie', 'Chine', 'Canada', 'États-Unis'],
		disabled: false,
		readOnly: false,
		value: undefined,
	},
	component: Combobox,
	title: 'Components/Form/Combobox',
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
			className={styles.completeForm}
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

export const optionAvecValue: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<form onSubmit={(event) => {
			event.preventDefault();
			alert(`
				label: ${event.currentTarget['pays.label'].value},
				value: ${event.currentTarget['pays.value'].value}
			`);
		}}>
			<label htmlFor="pays">Pays</label>
			<Combobox id="pays" name="pays" {...args}>
				{children.map((child, index) => <Combobox.Option value={index} key={index}>{child}</Combobox.Option>)}
			</Combobox>
		</form>
	),
};

export const validation: Story = {
	args: {
		requireValidOption: true,
	},
	render: ({ children, ...args }) => (
		<form onSubmit={(event) => {
			event.preventDefault();
			alert(`
				label: ${event.currentTarget['pays.label'].value},
				value: ${event.currentTarget['pays.value'].value}
			`);
		}}>
			<label htmlFor="pays">Pays (sélectionnez une valeur dans la liste)</label>
			<Combobox id="pays" name="pays" {...args}>
				{children.map((child, index) => <Combobox.Option value={index} key={index}>{child}</Combobox.Option>)}
			</Combobox>
			<ButtonComponent label="Envoyer">Envoyer</ButtonComponent>
		</form>
	),
};
