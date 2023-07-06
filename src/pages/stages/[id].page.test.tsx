/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterOffreStagePage from '~/pages/stages/[id].page';
import { OffreDeStage, SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';
import { checkA11y } from '~/test-utils';

describe('<ConsulterOffreStagePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		
		const offreDeStage: OffreDeStage = {
			dateDeDebutMax: 'dateDeDebutMax',
			dateDeDebutMin: 'dateDeDebutMin',
			description: 'description',
			domaines: [],
			dureeEnJour: 1,
			dureeEnJourMax: 1,
			employeur: {
				description: 'description',
				logoUrl: 'logo',
				nom: 'nom',
				siteUrl: 'siteWebUrl',
			},
			id: 'id',
			localisation: {
				departement: 'departement',
				region: 'region',
			},
			remunerationBase: 1,
			slug: 'slug',
			source: SourceDesDonnées.INTERNE,
			teletravailPossible: true,
			titre: 'titre', 
			urlDeCandidature: 'urlDeCandidature',
		};
		
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterOffreStagePage offreDeStage={offreDeStage} />
			</DependenciesProvider>,
		);

		await checkA11y(container);
	});
});
