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
			mockSmallScreen();
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
							titre: 'Titre 1',
							ville: 'Paris',
						},
						{
							id: '2',
							nomEntreprise: 'Entreprise 2',
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
				expect(await screen.findByText('Entreprise 1')).toBeVisible();
				expect(await screen.findByText('Titre 1')).toBeVisible();

				const lienOffre1 = screen.getByRole('link', { name: 'Titre 1 En savoir plus' });
				expect(lienOffre1).toBeVisible();
				expect(lienOffre1).toHaveAttribute('href', '/emplois-europe/1');

				expect(await screen.findByText('Entreprise 2')).toBeVisible();
				expect(await screen.findByText('Titre 2')).toBeVisible();

				const lienOffre2 = screen.getByRole('link', { name: 'Titre 2 En savoir plus' });
				expect(lienOffre2).toBeVisible();
				expect(lienOffre2).toHaveAttribute('href', '/emplois-europe/2');
			});

			describe('quand un résultat contient un pays et une ville', () => {
				it('affiche le résultat avec le pays et la ville', async () => {
					// GIVEN
					const emploiEuropeServiceMock = anEmploiEuropeService();
					const resultatsService: ResultatRechercheEmploiEurope = {
						nombreResultats: 1,
						offreList: [
							{
								id: '1',
								nomEntreprise: 'Entreprise 1',
								pays: 'France',
								titre: 'Titre 1',
								ville: 'Paris',
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
					expect(await screen.findByText('Entreprise 1')).toBeVisible();
					expect(await screen.findByText('Titre 1')).toBeVisible();
					expect(await screen.findByText('France/Paris')).toBeVisible();
				});
			});

			describe('quand un résultat contient un pays mais pas de ville', () => {
				it('affiche le résultat avec le pays', async () => {
					// GIVEN
					const emploiEuropeServiceMock = anEmploiEuropeService();
					const resultatsService: ResultatRechercheEmploiEurope = {
						nombreResultats: 1,
						offreList: [
							{
								id: '1',
								nomEntreprise: 'Entreprise 1',
								pays: 'France',
								titre: 'Titre 1',
								ville: undefined,
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
					expect(await screen.findByText('Entreprise 1')).toBeVisible();
					expect(await screen.findByText('Titre 1')).toBeVisible();
					expect(await screen.findByText('France')).toBeVisible();
				});
			});

			describe('quand un résultat contient une ville mais pas de pays', () => {
				it('affiche le résultat avec la ville', async () => {
					// GIVEN
					const emploiEuropeServiceMock = anEmploiEuropeService();
					const resultatsService: ResultatRechercheEmploiEurope = {
						nombreResultats: 1,
						offreList: [
							{
								id: '1',
								nomEntreprise: 'Entreprise 1',
								pays: undefined,
								titre: 'Titre 1',
								ville: 'Paris',
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
					expect(await screen.findByText('Entreprise 1')).toBeVisible();
					expect(await screen.findByText('Titre 1')).toBeVisible();
					expect(await screen.findByText('Paris')).toBeVisible();
				});
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
								titre: 'Titre 1',
								ville: 'Paris',
							},
							{
								id: '2',
								nomEntreprise: 'Entreprise 2',
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
								titre: 'Titre 1',
								ville: 'Paris',
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

		describe('quand l’URL contient un code pays de recherche et un libellé de pays', () => {
			it('affiche les résultats de la recherche', async () => {
				// GIVEN
				const emploiEuropeServiceMock = anEmploiEuropeService();
				const resultatsService: ResultatRechercheEmploiEurope = {
					nombreResultats: 2,
					offreList: [
						{
							id: '1',
							nomEntreprise: 'Entreprise 1',
							titre: 'Titre 1',
							ville: 'Paris',
						},
						{
							id: '2',
							nomEntreprise: 'Entreprise 2',
							titre: 'Titre 2',
						},
					],
				};
				jest.spyOn(emploiEuropeServiceMock, 'rechercherEmploiEurope').mockResolvedValue(createSuccess(resultatsService));

				mockSmallScreen();
				mockUseRouter({
					query: {
						codePays: 'ES',
						libellePays: 'Espagne',
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
				expect(await screen.findByText('Entreprise 1')).toBeVisible();
				expect(await screen.findByText('Titre 1')).toBeVisible();
				expect(await screen.findByText('Entreprise 2')).toBeVisible();
				expect(await screen.findByText('Titre 2')).toBeVisible();
			});
		});

		describe('quand l’URL ne contient pas de mot clé de recherche ou de code de pays de recherche ou de libellé de pays', () => {
			it('affiche le nombre de résultats de la recherche', async () => {
				// GIVEN
				const emploiEuropeServiceMock = anEmploiEuropeService();
				const resultatsService: ResultatRechercheEmploiEurope = {
					nombreResultats: 2,
					offreList: [
						{
							id: '1',
							nomEntreprise: 'Entreprise 1',
							titre: 'Titre 1',
							ville: 'Paris',
						},
						{
							id: '2',
							nomEntreprise: 'Entreprise 2',
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

	describe('quand un des résultats ne contient pas de titre', () => {
		it('affiche le résultat avec un titre générique', async () => {
			// GIVEN
			const emploiEuropeServiceMock = anEmploiEuropeService();
			const resultatsService: ResultatRechercheEmploiEurope = {
				nombreResultats: 1,
				offreList: [
					{
						id: '1',
						nomEntreprise: 'Entreprise 1',
						titre: undefined,
						ville: 'Paris',
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
			expect(await screen.findByText('Offre d’emploi sans titre')).toBeVisible();
		});
	});

	it('affiche les étiquette de filtres de recherche correspondant aux paramètres dans l’URL', async () => {
		// GIVEN
		const emploiEuropeServiceMock = anEmploiEuropeService();
		const resultatsService: ResultatRechercheEmploiEurope = {
			nombreResultats: 2,
			offreList: [
				{
					id: '1',
					nomEntreprise: 'Entreprise 1',
					titre: 'Titre 1',
					ville: 'Paris',
				},
				{
					id: '2',
					nomEntreprise: 'Entreprise 2',
					titre: 'Titre 2',
				},
			],
		};
		jest.spyOn(emploiEuropeServiceMock, 'rechercherEmploiEurope').mockResolvedValue(createSuccess(resultatsService));

		mockSmallScreen();
		mockUseRouter({
			query: {
				codePays: 'ES',
				libellePays: 'Espagne',
				page: '1',
				typeContrat: 'contract,apprenticeship',
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

		// THEN
		const etiquettesRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
		expect(etiquettesRecherche).toBeVisible();
		const etiquettes = within(etiquettesRecherche).getAllByRole('listitem');
		expect(etiquettes).toHaveLength(3);
		expect(etiquettes[0]).toHaveTextContent('Espagne');
		expect(etiquettes[1]).toHaveTextContent('Contrat');
		expect(etiquettes[2]).toHaveTextContent('Apprentissage');
	});
});
