import type { Meta, StoryObj } from '@storybook/react';

import {
	anEtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

import {
	TypeÉtablissement,
} from '../../../../../../server/etablissement-accompagnement/domain/etablissementAccompagnement';
import { DependenciesProvider } from '../../../../../context/dependenciesContainer.context';
import {
	anEtablissementAccompagnementService,
} from '../../../../../services/établissementAccompagnement/etablissementAccompagnement.fixture';
import { aLocalisationService } from '../../../../../services/localisation/localisation.service.fixture';
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
		etablissement: anEtablissementAccompagnement({ type: TypeÉtablissement.MISSION_LOCALE }),
	},
};
export const MissionLocaleSansEmail: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({ email: undefined, type: TypeÉtablissement.MISSION_LOCALE }),
	},
};
export const InfoJeune: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({ type: TypeÉtablissement.INFO_JEUNE }),
	},
};
export const FranceTravail: Story = {
	args: {
		etablissement: anEtablissementAccompagnement({ type: TypeÉtablissement.FRANCE_TRAVAIL }),
	},
};
