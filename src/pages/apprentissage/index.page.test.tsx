/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen, waitFor } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import RechercherAlternancePage from '~/pages/apprentissage/index.page';
import { Alternance } from '~/server/alternances/domain/alternance';

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

		it('n‘a pas de défaut d‘accessibilité', async () => {
			const alternanceFixture: Array<Alternance> = [
				{
					entreprise: { nom: 'MONSIEUR MICHEL' },
					id: 'an-id-matchas',
					niveauRequis: 'Cap, autres formations niveau (Infrabac)',
					source: Alternance.Source.MATCHA,
					tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
					titre: 'Ouvrier boulanger / Ouvrière boulangère',
					typeDeContrat: ['Apprentissage'],
				},
				{
					entreprise: { nom: 'une entreprise' },
					id: 'an-id-pe',
					localisation: 'paris',
					source: Alternance.Source.POLE_EMPLOI,
					tags: ['paris', 'Contrat d‘alternance', 'CDD'],
					titre: 'un titre',
					typeDeContrat: ['CDD'],
				},
			];
			const alternanceServiceMock = anAlternanceService(alternanceFixture);
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMétierService();
			mockUseRouter({ query: {
				codeCommune: '75056',
				codeRomes: 'D1102%2CD1104',
				distanceCommune: '10',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris (75001)',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				longitudeCommune: '2.347',
				page: '1',
			} });

			const { container } = render(<DependenciesProvider
				analyticsService={anAnalyticsService()}
				localisationService={localisationServiceMock}
				alternanceService={alternanceServiceMock}
				métierService={métiersServiceMock}
			>
				<RechercherAlternancePage/>
			</DependenciesProvider>,
			);

			await waitFor(() => {
				screen.queryByText(`${alternanceFixture.length} résultats pour Boulangerie, pâtisserie, chocolaterie` );
			});
			// await screen.findByText(`${alternanceFixture.length} résultats pour Boulangerie, pâtisserie, chocolaterie` );
			screen.debug(undefined, Infinity);
			expect(container).toBeAccessible();
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
