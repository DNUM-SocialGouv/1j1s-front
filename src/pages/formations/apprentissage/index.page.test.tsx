/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aFormationService } from '~/client/services/formation/formation.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import FormationAlternancePage, { getServerSideProps } from '~/pages/formations/apprentissage/index.page';

describe('Page Formations en Apprentissage', () => {
	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			mockSmallScreen();
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '0',
			};
		});
		it('retourne une page 404', async () => {
			const value = await getServerSideProps();

			expect(value).toEqual({ notFound: true });
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			mockSmallScreen();
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '1',
			};
		});
		it('retourne les props de la page', async () => {
			const value = await getServerSideProps();

			expect(value).toEqual({ props: {} });
		});

		it('envoie les analytics de la page à son affichage', () => {
			const analyticsService = anAnalyticsService();
			mockUseRouter({});

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					formationService={aFormationService()}
					métierService={aMétierService()}
					localisationService={aLocalisationService()}
				>
					<FormationAlternancePage />
				</DependenciesProvider>,
			);

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'formation_apprentissage_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});
});
