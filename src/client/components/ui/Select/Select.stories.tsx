import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
	args: {
		label: 'Domaine',
		optionList: [
			{
				libellé: 'Culture et loisirs',
				valeur: 'culture-loisirs',
			},
			{
				libellé: 'Éducation',
				valeur: 'education',
			},
			{
				libellé: 'Environnement',
				valeur: 'environnement',
			},
		],
	},
	component: Select,
	title: 'Components/Form/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

export const SimpleSelect: Story = {};

export const MultiSelect: Story = {
	args: {
		multiple: true,
	},
};

