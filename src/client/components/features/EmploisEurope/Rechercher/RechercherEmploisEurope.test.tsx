/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherEmploisEurope from '~/client/components/features/EmploisEurope/Rechercher/RechercherEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aEmploiEuropeService } from '~/client/services/europe/emploiEurope.service.fixture';

describe('RechercherEmploisEurope', () => {
	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche d‘emplois en europe, sans échantillon de résultat', async () => {
			// GIVEN
			const emploiEuropeServiceMock = aEmploiEuropeService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					emploiEuropeService={emploiEuropeServiceMock}
				>
					<RechercherEmploisEurope/>
				</DependenciesProvider>,
			);
			const formulaireRechercheEmploisEurope = screen.getByRole('form');

			// THEN
			expect(formulaireRechercheEmploisEurope).toBeInTheDocument();
			expect(emploiEuropeServiceMock.rechercherEmploiEurope).toHaveBeenCalledTimes(0);
		});
	});
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les résultats de la recherche', async () => {
			// GIVEN
			const emploiEuropeServiceMock = aEmploiEuropeService();

			mockSmallScreen();
			mockUseRouter({
				query: {
					motCle: 'Développeur',
					page: '1',
				},
			});

			// WHEN
			render(
				<DependenciesProvider
					emploiEuropeService={emploiEuropeServiceMock}
				>
					<RechercherEmploisEurope/>
				</DependenciesProvider>,
			);
			const resultatsUl = await screen.findAllByRole('list', { name: 'Offres d’emplois en Europe' });
			const resultats = within(resultatsUl[0]).getAllByRole('listitem');

			// THEN
			expect(resultats).toHaveLength(2);
		});
	});
});
