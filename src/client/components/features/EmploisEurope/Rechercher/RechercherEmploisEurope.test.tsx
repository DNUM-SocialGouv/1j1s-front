/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import RechercherEmploisEurope from '~/client/components/features/EmploisEurope/Rechercher/RechercherEmploisEurope';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anEmploiEuropeService } from '~/client/services/europe/emploiEurope.service.fixture';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
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
		describe('quand l’URL contient un mot clé de recherche', () => {
			it('affiche les résultats de la recherche', async () => {
				// GIVEN
				const emploiEuropeServiceMock = anEmploiEuropeService();
				const resultatsService: ResultatRechercheEmploiEurope = {
					nombreResultats: 2,
					offreList: [
						{
							id: '1',
							nomEntreprise: 'Entreprise 1',
							tags: ['Paris'],
							titre: 'Titre 1',
						},
						{
							id: '2',
							nomEntreprise: 'Entreprise 2',
							tags: [],
							titre: 'Titre 2',
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
				const resultats = await within(resultatsUl[0]).findAllByTestId('RésultatRechercherSolution');

				// THEN
				expect(resultats).toHaveLength(resultatsService.offreList.length);
				expect(await screen.findByText('Entreprise 1')).toBeInTheDocument();
				expect(await screen.findByText('Titre 1')).toBeInTheDocument();
				expect(await screen.findByText('Entreprise 2')).toBeInTheDocument();
				expect(await screen.findByText('Titre 2')).toBeInTheDocument();
			});

			describe('quand la recherche contient plusieurs résultats', () => {
				it('affiche le nombre de résultats de la recherche', async () => {
					// GIVEN
					const emploiEuropeServiceMock = anEmploiEuropeService();
					const resultatsService: ResultatRechercheEmploiEurope = {
						nombreResultats: 2,
						offreList: [
							{
								id: '1',
								nomEntreprise: 'Entreprise 1',
								tags: ['Paris'],
								titre: 'Titre 1',
							},
							{
								id: '2',
								nomEntreprise: 'Entreprise 2',
								tags: [],
								titre: 'Titre 2',
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
					const nombreResultats = await screen.findByRole('heading', { level: 2, name: '2 offres d’emplois en Europe pour Développeur' });

					// THEN
					expect(nombreResultats).toBeVisible();
				});
			});

			describe('quand la recherche contient un seul résultat', () => {
				it('affiche le nombre de résultats de la recherche', async () => {
					// GIVEN
					const emploiEuropeServiceMock = anEmploiEuropeService();
					const resultatsService: ResultatRechercheEmploiEurope = {
						nombreResultats: 1,
						offreList: [
							{
								id: '1',
								nomEntreprise: 'Entreprise 1',
								tags: ['Paris'],
								titre: 'Titre 1',
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
					const nombreResultats = await screen.findByRole('heading', { level: 2, name: '1 offre d’emploi en Europe pour Développeur' });

					// THEN
					expect(nombreResultats).toBeVisible();
				});
			});
		});

		describe('quand l’URL ne contient pas de mot clé de recherche', () => {
			it('affiche le nombre de résultats de la recherche', async () => {
				// GIVEN
				const emploiEuropeServiceMock = anEmploiEuropeService();
				const resultatsService: ResultatRechercheEmploiEurope = {
					nombreResultats: 2,
					offreList: [
						{
							id: '1',
							nomEntreprise: 'Entreprise 1',
							tags: ['Paris'],
							titre: 'Titre 1',
						},
						{
							id: '2',
							nomEntreprise: 'Entreprise 2',
							tags: [],
							titre: 'Titre 2',
						},
					],
				};
				jest.spyOn(emploiEuropeServiceMock, 'rechercherEmploiEurope').mockResolvedValue(createSuccess(resultatsService));

				mockSmallScreen();
				mockUseRouter({
					query: {
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
				const nombreResultats = await screen.findByRole('heading', { level: 2, name: '2 offres d’emplois en Europe' });

				// THEN
				expect(nombreResultats).toBeVisible();
			});
		});
	});
});
