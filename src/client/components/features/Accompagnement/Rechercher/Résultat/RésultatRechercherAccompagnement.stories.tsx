import type { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	anEtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/etablissementAccompagnement.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import {
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';
import {
	anEtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

import { RésultatRechercherAccompagnement } from './RésultatRechercherAccompagnement';

const meta: Meta<typeof RésultatRechercherAccompagnement> = {
	args: {
		etablissement: anEtablissementAccompagnement(),
	},
	component: RésultatRechercherAccompagnement,
	render: (args) => {
		return (
			<DependenciesProvider
				établissementAccompagnementService={anEtablissementAccompagnementService()}
				localisationService={aLocalisationService()}>
				<RésultatRechercherAccompagnement {...args} />
			</DependenciesProvider>
		);
	},
	title: 'Components/Feature/RésultatRechercherAccompagnement',
};

export default meta;
type Story = StoryObj<typeof RésultatRechercherAccompagnement>;

export const MissionLocale: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({
			email: 'contact@mission-locale.fr',
			type: TypeÉtablissement.MISSION_LOCALE,
		}),
	},
};
export const MissionLocaleSansEmail: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({ email: undefined, type: TypeÉtablissement.MISSION_LOCALE }),
	},
};
export const InfoJeune: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({
			email: 'contact@info-jeune.fr',
			type: TypeÉtablissement.INFO_JEUNE,
		}),
	},
};
export const FranceTravail: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({
			email: 'contact@francetravail.fr',
			type: TypeÉtablissement.FRANCE_TRAVAIL,
		}),
	},
};
