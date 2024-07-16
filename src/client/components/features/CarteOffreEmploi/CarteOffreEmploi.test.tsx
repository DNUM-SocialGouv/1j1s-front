/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { CarteOffreEmploi } from '~/client/components/features/CarteOffreEmploi/CarteOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { anOffreEmploi, aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import {
	FormulaireRechercheOffreEmploi
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';

describe('CarteOffreEmploi', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	// NOTE (DORO 13/02/2024): Ce describe intervient entre le chargement de la page sans query params page=1 et la redirection vers la page avec query params page=1
	describe('quand le composant est affiché sans query params', () => {
		it('affiche un formulaire pour la recherche d’offres d’emplois, sans échantillon de résultat', async () => {

			// GIVEN
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({});
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
				>
					<CarteOffreEmploi
						type={'emplois'}
						prefixTitrePage={'Rechercher un emploi'}
						FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
						headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
						premierTexteBanniere={'Des milliers d’offres d’emplois'}
						ariaLabelListeOffres={'Offres d’emplois'}
					/>
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheOffreEmploi = screen.getByRole('search');
			const nbResultats = screen.queryByText('0 résultat');

			// THEN
			expect(formulaireRechercheOffreEmploi).toBeInTheDocument();
			expect(nbResultats).not.toBeInTheDocument();
		});
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche d’offres d’emplois, avec un échantillon de résultat', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
				>
					<CarteOffreEmploi
						type={'emplois'}
						resultats={aRésultatsRechercheOffre()}
						prefixTitrePage={'Rechercher un emploi'}
						FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
						headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
						premierTexteBanniere={'Des milliers d’offres d’emplois'}
						ariaLabelListeOffres={'Offres d’emplois'}
					/>
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheOffreEmploi = screen.getByRole('search');
			expect(await screen.findByText('3 offres d’emplois')).toBeInTheDocument();
			const errorMessage = screen.queryByText('0 résultat');

			// THEN
			expect(formulaireRechercheOffreEmploi).toBeInTheDocument();
			expect(errorMessage).not.toBeInTheDocument();
		});
	});

	describe('quand le composant est affiché avec une recherche avec résultats', () => {
		describe('quand la recherche ne comporte pas de mot clé', () => {
			describe('que la recherche est de type département', () => {
				it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
					// GIVEN
					const localisationServiceMock = aLocalisationService();
					mockUseRouter({
						query: {
							codeLocalisation: '26',
							nomLocalisation: 'BOURG LES VALENCE',
							typeLocalisation: 'DEPARTEMENT',
						},
					});

					// WHEN
					render(
						<DependenciesProvider
							localisationService={localisationServiceMock}
						>
							<CarteOffreEmploi
								type={'emplois'}
								resultats={aRésultatsRechercheOffre()}
								prefixTitrePage={'Rechercher un emploi'}
								FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
								headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
								premierTexteBanniere={'Des milliers d’offres d’emplois'}
								ariaLabelListeOffres={'Offres d’emplois'}
							/>
						</DependenciesProvider>,
					);

					// THEN
					expect(await screen.findByText('3 offres d’emplois')).toBeInTheDocument();
					const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
					expect(filtresRecherche).toBeInTheDocument();
					expect(within(filtresRecherche).getByText('BOURG LES VALENCE (26)')).toBeInTheDocument();
				});
			});
			describe('que la recherche est de type commune', () => {
				it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
					// GIVEN
					const localisationServiceMock = aLocalisationService();
					mockUseRouter({
						query: {
							codeLocalisation: '26',
							codePostalLocalisation: '26500',
							nomLocalisation: 'BOURG LES VALENCE',
							typeLocalisation: 'COMMUNE',
						},
					});

					// WHEN
					render(
						<DependenciesProvider
							localisationService={localisationServiceMock}
						>
							<CarteOffreEmploi
								type={'emplois'}
								resultats={aRésultatsRechercheOffre()}
								prefixTitrePage={'Rechercher un emploi'}
								FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
								headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
								premierTexteBanniere={'Des milliers d’offres d’emplois'}
								ariaLabelListeOffres={'Offres d’emplois'}
							/>
						</DependenciesProvider>,
					);

					// THEN
					expect(await screen.findByText('3 offres d’emplois')).toBeInTheDocument();
					const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
					expect(filtresRecherche).toBeInTheDocument();
					expect(within(filtresRecherche).getByText('BOURG LES VALENCE (26500)')).toBeInTheDocument();
				});
				it('quand il n‘y a pas de code postal dans la query, affiche seulement le nom de la localisation dans l‘étiquette', async () => {
					// GIVEN
					const localisationServiceMock = aLocalisationService();
					mockUseRouter({
						query: {
							codeLocalisation: '26',
							nomLocalisation: 'BOURG LES VALENCE',
							typeLocalisation: 'COMMUNE',
						},
					});

					// WHEN
					render(
						<DependenciesProvider
							localisationService={localisationServiceMock}
						>
							<CarteOffreEmploi resultats={aRésultatsRechercheOffre()}/>
						</DependenciesProvider>,
					);

					// THEN
					const filtresRecherche = await screen.findByRole('list', { name: 'Filtres de la recherche' });
					expect(filtresRecherche).toBeInTheDocument();
					expect(within(filtresRecherche).getByText('BOURG LES VALENCE')).toBeInTheDocument();
				});
			});
		});

		describe('quand on recherche par mot clé', () => {
			it('affiche les résultats de recherche et le nombre de résultats', async () => {
				// GIVEN
				const localisationServiceMock = aLocalisationService();
				mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });

				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
					>
						<CarteOffreEmploi
							type={'emplois'}
							resultats={aRésultatsRechercheOffre()}
							prefixTitrePage={'Rechercher un emploi'}
							FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
							headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
							premierTexteBanniere={'Des milliers d’offres d’emplois'}
							ariaLabelListeOffres={'Offres d’emplois'}
						/>
					</DependenciesProvider>,
				);

				// WHEN
				const resultatsUl = await screen.findAllByRole('list', { name: 'Offres d’emplois' });
				// eslint-disable-next-line testing-library/no-node-access
				const resultatRechercheOffreEmploiList = resultatsUl[0].children;
				const rechercheOffreEmploiNombreRésultats = await screen.findByText('3 offres d’emplois pour boulanger');

				// THEN
				expect(resultatRechercheOffreEmploiList).toHaveLength(3);
				expect(rechercheOffreEmploiNombreRésultats).toBeInTheDocument();
			});
		});
	});

	describe('quand le composant est affiché avec une recherche comportant un seul résultat', () => {
		it('affiche le nombre de résultat au singulier', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();
			const expected = aRésultatsRechercheOffre({
				nombreRésultats: 1,
				résultats: [
					anOffreEmploi(),
				],
			});
			mockUseRouter({ query: { motCle: 'barman', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
				>
					<CarteOffreEmploi
						type={'emplois'}
						resultats={expected}
						prefixTitrePage={'Rechercher un emploi'}
						FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
						headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
						premierTexteBanniere={'Des milliers d’offres d’emplois'}
						ariaLabelListeOffres={'Offres d’emplois'}
					/>
				</DependenciesProvider>,
			);

			// WHEN
			const errorMessage = await screen.findByText('1 offre d’emploi pour barman');

			// THEN
			expect(errorMessage).toBeInTheDocument();
		});
	});

	describe('quand le composant est affiché avec une recherche sans résultats', () => {
		it('affiche un message dédié', async () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();
			const expected = aRésultatsRechercheOffre({
				nombreRésultats: 0,
				résultats: [],
			});
			mockUseRouter({ query: { motCle: 'mot clé qui ne donne aucun résultat', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
				>
					<CarteOffreEmploi resultats={expected}/>
				</DependenciesProvider>,
			);

			// WHEN
			const errorMessage = await screen.findByText('0 résultat');

			// THEN
			expect(errorMessage).toBeInTheDocument();
		});
	});

	describe('carte de résultat', () => {
		it('lorsque l‘entreprise a fourni un logo, affiche ce logo sans alternative', async () => {
			const offre = aRésultatsRechercheOffre({
				nombreRésultats: 1,
				résultats: [anOffreEmploi({ entreprise: { logo: 'http://logo.com' } })],
			});
			mockUseRouter({ query: { motCle: 'barman', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={aLocalisationService()}
				>
					<CarteOffreEmploi
						type={'emplois'}
						resultats={offre}
						prefixTitrePage={'Rechercher un emploi'}
						FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
						headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
						premierTexteBanniere={'Des milliers d’offres d’emplois'}
						ariaLabelListeOffres={'Offres d’emplois'}
					/>
				</DependenciesProvider>,
			);

			const messageNombreRésultats = await screen.findByText('1 offre d’emploi pour barman');

			expect(messageNombreRésultats).toBeInTheDocument();
			const item = screen.getAllByRole('listitem')[0];
			const img = within(item).getByRole('presentation');
			expect(img).toBeVisible();
			expect(img).toHaveAttribute('src', expect.stringContaining('logo.com'));
			expect(img).toHaveAttribute('alt', '');
		});
		it('lorsque l‘entreprise n‘a pas fourni de logo, affiche ce logo de France travail et l‘alternative associée',async () => {
			const offre = aRésultatsRechercheOffre({
				nombreRésultats: 1,
				résultats: [anOffreEmploi({ entreprise: { logo: undefined } })],
			});
			mockUseRouter({ query: { motCle: 'barman', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={aLocalisationService()}
				>
					<CarteOffreEmploi
						type={'emplois'}
						resultats={offre}
						prefixTitrePage={'Rechercher un emploi'}
						FormulaireDeRechercheComposant={<FormulaireRechercheOffreEmploi/>}
						headDescription={'Des milliers d’offres d’emplois sélectionnées pour vous'}
						premierTexteBanniere={'Des milliers d’offres d’emplois'}
						ariaLabelListeOffres={'Offres d’emplois'}
					/>
				</DependenciesProvider>,
			);

			const messageNombreRésultats = await screen.findByText('1 offre d’emploi pour barman');

			expect(messageNombreRésultats).toBeInTheDocument();
			const item = screen.getAllByRole('listitem')[0];
			const img = within(item).getByRole('img');
			expect(img).toBeVisible();
			expect(img).toHaveAttribute('src', expect.stringContaining('france-travail'));
			expect(img).toHaveAttribute('alt', 'France travail');
		});
	});
});
