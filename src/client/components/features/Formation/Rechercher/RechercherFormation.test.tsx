/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherFormation from '~/client/components/features/Formation/Rechercher/RechercherFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aFormationService } from '~/client/services/formation/formation.service.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { Formation, NiveauRequis } from '~/server/formations/domain/formation';

describe('RechercherFormation', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de formations, sans échantillon de résultat', async () => {
			// GIVEN
			const formationServiceMock = aFormationService();
			const métierServiceMock = aMétierService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationServiceMock}
					métierService={métierServiceMock}
				>
					<RechercherFormation/>
				</DependenciesProvider>,
			);
			const formulaireRechercheFormation = screen.getByRole('form');
			const nbRésultats = screen.queryByText(/^[0-9]+ formation(s)? en alternance$/);

			// THEN
			expect(formulaireRechercheFormation).toBeInTheDocument();
			expect(nbRésultats).not.toBeInTheDocument();
			expect(formationServiceMock.rechercherFormation).toHaveBeenCalledTimes(0);
		});
	});
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
			// GIVEN
			const formationFixture: Formation[] = [
				{
					nomEntreprise: 'La Bonne Alternance',
					tags: ['Paris', NiveauRequis['NIVEAU_5']],
					titre: 'Développeur web',
				},
			];
			const formationServiceMock = aFormationService(formationFixture);
			const métierServiceMock = aMétierService();
			mockUseRouter({
				query: {
					codeRomes: 'D1103,D1101,H2101',
					libelleMetier: 'Boucherie,charcuterie,traiteur',
				},
			});
			const expectedQuery = 'codeRomes=D1103%2CD1101%2CH2101&libelleMetier=Boucherie%2Ccharcuterie%2Ctraiteur';

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationServiceMock}
					métierService={métierServiceMock}
				>
					<RechercherFormation/>
				</DependenciesProvider>,
			);
			const formulaireRechercheFormation = screen.getByRole('form');
			const nbRésultats = await screen.findByText(/[0-9]+ formation(s)? en alternance/);

			// THEN
			expect(formulaireRechercheFormation).toBeInTheDocument();
			expect(nbRésultats).toBeInTheDocument();
			expect(formationServiceMock.rechercherFormation).toHaveBeenCalledWith(expectedQuery);
			const resultList = await screen.findByRole('list', { name: 'Formations en alternance' });
			const resultListElements = within(resultList).getAllByText('En savoir plus');
			expect(resultListElements).toHaveLength(formationFixture.length);
			expect(await screen.findByText((formationFixture[0].titre))).toBeInTheDocument();
		});
	});
});
