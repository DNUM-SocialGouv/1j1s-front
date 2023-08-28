import { Meta, StoryObj } from '@storybook/react';
import { useEffect,useState } from 'react';

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
		filter: { type: 'function' },
		onBlur: { type: 'function' },
		onFocus: { type: 'function' },
		value: { type: 'string' },
	},
	args: {
		'aria-label': 'Pays',
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
				{children.map((child) => <Combobox.Option key={child}>{child}</Combobox.Option>)}
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
				{children.map((child) => <Combobox.Option key={child}>{child}</Combobox.Option>)}
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
					{children.map((child) => <Combobox.Option key={child}>{child}</Combobox.Option>)}
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

function grouperParPremiereLettre(children) {
	return Object.entries<string[]>(children.sort()
		.reduce((accumulator, current) => {
			const key = current.charAt(0);
			if (accumulator[key] == undefined) {
				accumulator[key] = [];
			}
			accumulator[key].push(current);
			return accumulator;
		}, {}));
}

export const categories: Story = {
	args: {},
	render: ({ children, ...args }) => (
		<>
			<label htmlFor="pays">Pays</label>
			<Combobox id="pays" {...args}>{
				grouperParPremiereLettre(children)
					.map(([category, entries]) => (
						<Combobox.Category key={category} name={category}>{
							entries.map((entry) => (<Combobox.Option key={entry}>{entry}</Combobox.Option>))
						}</Combobox.Category>
					))
			}</Combobox>
		</>
	),
};

export const async: Story = {
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function AsyncCombobox({ children, onChange = (_event, _newValue) => {}, ...args }) {
		const [ value, setValue] = useState('');
		const [ loading, setLoading ] = useState(true);

		useEffect(() => {
			setLoading(true);
			const timeout = setTimeout(() => {
				setLoading(false);
			}, 2000);
			return () => clearTimeout(timeout);
		}, [value]);

		const apiResults = children.filter((child) => child.includes(value));

		return (
			<>
				<label htmlFor="pays">Pays</label>
				<Combobox id="pays" filter={Combobox.noFilter} value={value} onChange={(_, newValue) => {
					onChange(_, newValue);
					setValue(newValue);
				}} {...args}>
					{!loading && apiResults.map((result, index) => <Combobox.Option value={index} key={index}>{result}</Combobox.Option>)}
					<Combobox.AsyncMessage>{loading ? 'Chargement ...' : `${apiResults.length} résultats trouvés`}</Combobox.AsyncMessage>
				</Combobox>
			</>
		);
	},
};

export const filterStrategyNoFilter: Story = {
	args: {
		filter: Combobox.noFilter,
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
