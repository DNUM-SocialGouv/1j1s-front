import type { Meta, StoryObj } from '@storybook/react';

import {
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

import { RésultatRechercherAccompagnement } from './RésultatRechercherAccompagnement';

const meta: Meta<typeof RésultatRechercherAccompagnement> = {
	args: {
		établissement: {
			adresse: '14 rue de la montagne Sainte Geneviève',
			email: 'mail@adress.com',
			horaires: [
				{
					heures: [
						{
							début: '9h',
							fin: '12h',
						},
					],
					jour: 'Lundi',
				},
			],
			id: '1',
			nom: 'Mission Locale de Paris',
			telephone: '01 02 03 04 05',
			type: TypeÉtablissement.MISSION_LOCALE,
		},
	},
	component: RésultatRechercherAccompagnement,
	title: 'Components/Feature/RésultatRechercherAccompagnement',
};

export default meta;
type Story = StoryObj<typeof RésultatRechercherAccompagnement>;

export const Default: Story = {
	args: {

	},
};
