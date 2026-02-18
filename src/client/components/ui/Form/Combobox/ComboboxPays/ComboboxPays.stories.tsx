import { Meta, StoryObj } from '@storybook/react';

import { ComboboxPays } from '.';

const meta: Meta<typeof ComboboxPays> = {
	argTypes: {
		defaultValue: {
			description: 'Valeur par défaut du combobox',
		},
		label: {
			description: 'Libellé affiché devant le combobox',
		},
		paysList: {
			description: 'Liste des pays de recherche dans le combobox',
		},
	},
	args: {
	},
	component: ComboboxPays,
	parameters: {
		docs: {
			controls: { exclude: ['onFocus','onChange', 'onBlur', 'onInput', 'filter', 'requireValidOption', 'valueName'] },
		},
	},
	title: 'Components/Form/Combobox/ComboboxPays',
};

export default meta;
type Story = StoryObj<typeof ComboboxPays>;
export const exemple: Story = {
	args: {
		paysList: [
			{
				code: 'ES',
				libellé: 'Espagne',
			},
			{
				code: 'FR',
				libellé: 'France',
			},
		],
	},
	render: ({ ...args }) => {
		return (
			<ComboboxPays {...args} />
		);
	},
};

export const AvecPlaceholder: Story = {
	args: {
		placeholder: 'Exemples: France, Belgique ... ',
	},
	render: ({ ...args }) => {
		return (
			<ComboboxPays {...args} />
		);
	},
};
