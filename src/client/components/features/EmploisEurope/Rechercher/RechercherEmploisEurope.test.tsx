/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherEmploisEurope from '~/client/components/features/EmploisEurope/Rechercher/RechercherEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anEmploiEuropeService } from '~/client/services/europe/emploiEurope.service.fixture';
import { createSuccess } from '~/server/errors/either';

describe('RechercherEmploisEurope', () => {
	describe('quand le composant est affiché sans paramètres de recherche dans l’URL', () => {
		it('affiche un formulaire pour la recherche d‘emplois en europe, sans échantillon de résultat', async () => {
			// GIVEN
			const emploiEuropeServiceMock = anEmploiEuropeService();
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
			expect(formulaireRechercheEmploisEurope).toBeVisible();
			expect(emploiEuropeServiceMock.rechercherEmploiEurope).toHaveBeenCalledTimes(0);
		});
	});
	describe('quand le composant est affiché pour une recherche avec résultats', () => {
		it('affiche les résultats de la recherche', async () => {
			// GIVEN
			const emploiEuropeServiceMock = anEmploiEuropeService();
			const resultatsService = {
				offreList: [
					{
						id: '1',
					},
					{
						id: '2',
					},
				],
			};
			jest.spyOn(emploiEuropeServiceMock, 'rechercherEmploiEurope').mockResolvedValue(createSuccess(resultatsService));

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
			expect(resultats).toHaveLength(resultatsService.offreList.length);
		});
	});
});
