/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherAlternance from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { Alternance } from '~/server/alternances/domain/alternance';

describe('RechercherAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de formations, sans échantillon de résultat', async () => {
			// GIVEN
			const alternanceServiceMock = anAlternanceService();
			const métierServiceMock = aMétierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceServiceMock}
					métierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');
			const nbRésultats = screen.queryByText(/^[0-9]+ formation(s)? en alternance$/);

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(nbRésultats).not.toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledTimes(0);
		});
	});
	
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
			// GIVEN
			const alternanceFixture: Alternance[] = [
				{
					niveauRequis: 'Cap, autres formations niveau (Infrabac)',
					nomEntreprise: 'MONSIEUR MICHEL',
					source: Alternance.Source.MATCHA,
					tags: ['Apprentissage',  'Cap, autres formations niveau (Infrabac)'],
					titre: 'Ouvrier boulanger / Ouvrière boulangère',
					typeDeContrat: ['Apprentissage'],
				},
				{
					localisation: 'paris',
					nomEntreprise: 'une entreprise',
					source: Alternance.Source.POLE_EMPLOI,
					tags: ['paris', 'Contrat d‘alternance', 'CDD'],
					titre: 'un titre',
					typeDeContrat: ['CDD'],
				},
			];
			const alternanceServiceMock = anAlternanceService(alternanceFixture);
			const métierServiceMock = aMétierService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({
				query: {
					contrat: 'alternance',
					formation: 'Développeur web',
					lieu: 'Paris',
				},
			});
			const expectedQuery = 'contrat=alternance&formation=D%C3%A9veloppeur%20web&lieu=Paris';

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceServiceMock}
					métierService={métierServiceMock}
					localisationService={localisationServiceMock}
				>
					<RechercherAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');
			const nbRésultats = await screen.findByText(/^[0-9]+ offre(s)? d’alternance(s)?$/);

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(nbRésultats).toBeInTheDocument();
			expect(alternanceServiceMock.rechercherAlternance).toHaveBeenCalledWith(expectedQuery);
			const resultList = await within(await screen.findByRole('list', { name: 'Offres d’alternances' })).findAllByTestId('RésultatRechercherSolution');
			expect(resultList).toHaveLength(alternanceFixture.length);
			expect(await screen.findByText(alternanceFixture[0].titre)).toBeInTheDocument();
			expect(await screen.findByText(alternanceFixture[1].titre)).toBeInTheDocument();
		});
	});
});
