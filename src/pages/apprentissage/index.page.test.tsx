/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import RechercherAlternancePage from '~/pages/apprentissage/index.page';

describe('Page rechercher une alternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '0',
			};
		});

		it('ne retourne rien', async () => {
			const alternanceServiceMock = anAlternanceService();
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMétierService();
			mockUseRouter({ query: { page: '1' } });

			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
					localisationService={localisationServiceMock}
					alternanceService={alternanceServiceMock}
					métierService={métiersServiceMock}
				>
					<RechercherAlternancePage/>
				</DependenciesProvider>,
			);

			const serviceIndisponible = screen.queryByText('Service Indisponible');
			expect(serviceIndisponible).toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '1',
			};
		});

		it('affiche le titre propre à la bonne alternance', async () => {
			const alternanceServiceMock = anAlternanceService();
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMétierService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
					localisationService={localisationServiceMock}
					alternanceService={alternanceServiceMock}
					métierService={métiersServiceMock}
				>
					<RechercherAlternancePage/>
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent(/Avec La bonne alternance/i);
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const alternanceServiceMock = anAlternanceService();
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMétierService();
			const analyticsService = anAnalyticsService();

			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					localisationService={localisationServiceMock}
					alternanceService={alternanceServiceMock}
					métierService={métiersServiceMock}
				>
					<RechercherAlternancePage/>
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { level: 1 });
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'emplois_liste',
				pagegroup: 'apprentissage',
				pagelabel: 'emplois_liste',
				'segment-site': 'offres_d_emploi',
			});
		});
	});
});
