/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { RechercherJobEte } from '~/client/components/features/JobEte/Rechercher/RechercherJobEte';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import {
	anOffreService,
	aNoResultOffreService,
	aSingleResultOffreService,
} from '~/client/services/offre/offreService.fixture';

describe('RechercherJobEte', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de jobs d’été, avec un échantillon de résultat', async () => {
			// GIVEN
			const offreServiceMock = anOffreService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					offreService={offreServiceMock}
				>
					<RechercherJobEte/>
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheOffreEmploi = screen.getByRole('search');
			expect(offreServiceMock.rechercherJobEte).toHaveBeenCalled();
			expect(await screen.findByText('3 offres de jobs d’été')).toBeInTheDocument();
			const errorMessage = screen.queryByText('0 résultat');

			// THEN
			expect(formulaireRechercheOffreEmploi).toBeInTheDocument();
			expect(errorMessage).not.toBeInTheDocument();
		});
	});

	describe('quand le composant est affiché avec une recherche avec résultats', () => {
		describe('quand la recherche ne comporte pas de mot clé', () => {
			it('affiche les critères de recherche sous forme d‘étiquettes', async () => {
				// GIVEN
				const offreServiceMock = anOffreService();
				const localisationServiceMock = aLocalisationService();
				mockUseRouter({
					query: {
						codeLocalisation: '26',
						libelleLocalisation: 'BOURG LES VALENCE (26)',
						typeLocalisation: 'DEPARTEMENT',
					},
				});

				// WHEN
				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						offreService={offreServiceMock}
					>
						<RechercherJobEte/>
					</DependenciesProvider>,
				);

				// THEN
				expect(offreServiceMock.rechercherJobEte).toHaveBeenCalledWith({
					codeLocalisation: '26',
					libelleLocalisation: 'BOURG LES VALENCE (26)',
					typeLocalisation: 'DEPARTEMENT',
				});
				expect(await screen.findByText('3 offres de jobs d’été')).toBeInTheDocument();
				const filtresRecherche = screen.getByRole('list', { name: 'Filtres de la recherche' });
				expect(filtresRecherche).toBeInTheDocument();
				expect(within(filtresRecherche).getByText('BOURG LES VALENCE (26)')).toBeInTheDocument();
			});
		});

		describe('quand on recherche par mot clé', () => {
			it('affiche les résultats de recherche et le nombre de résultats', async () => {
				// GIVEN
				const offreServiceMock = anOffreService();
				const localisationServiceMock = aLocalisationService();
				mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });

				render(
					<DependenciesProvider
						localisationService={localisationServiceMock}
						offreService={offreServiceMock}
					>
						<RechercherJobEte/>
					</DependenciesProvider>,
				);

				// WHEN
				const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherSolution');
				const rechercheOffreEmploiNombreRésultats = await screen.findByText('3 offres de jobs d’été pour boulanger');

				// THEN
				expect(résultatRechercheOffreEmploiList).toHaveLength(3);
				expect(rechercheOffreEmploiNombreRésultats).toBeInTheDocument();
				expect(offreServiceMock.rechercherJobEte).toHaveBeenCalledWith({ motCle: 'boulanger', page: '1' });
			});
		});
	});

	describe('quand le composant est affiché avec une recherche comportant un seul résultat', () => {
		it('affiche le nombre de résultat au singulier', async () => {
			// GIVEN
			const offreServiceMock = aSingleResultOffreService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { motCle: 'barman', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					offreService={offreServiceMock}
				>
					<RechercherJobEte/>
				</DependenciesProvider>,
			);

			// WHEN
			const errorMessage = await screen.findByText('1 offre de job d’été pour barman');

			// THEN
			expect(errorMessage).toBeInTheDocument();
		});
	});

	describe('quand le composant est affiché avec une recherche sans résultats', () => {
		it('affiche un message dédié', async () => {
			// GIVEN
			const offreServiceMock = aNoResultOffreService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { motCle: 'mot clé qui ne donne aucun résultat', page: '1' } });

			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					offreService={offreServiceMock}
				>
					<RechercherJobEte/>
				</DependenciesProvider>,
			);

			// WHEN
			const errorMessage = await screen.findByText('0 résultat');

			// THEN
			expect(errorMessage).toBeInTheDocument();
		});
	});

	it('filtre les query params de la page', async () => {
		const offreService = anOffreService();
		mockUseRouter({
			query: {
				page: '1',
				test: 'test',
			},
		});

		render(
			<DependenciesProvider
				localisationService={aLocalisationService()}
				offreService={offreService}
			>
				<RechercherJobEte/>
			</DependenciesProvider>,
		);

		await screen.findByText('3 offres de jobs d’été');

		expect(offreService.rechercherJobEte).toHaveBeenCalledWith({
			page: '1',
		});
	});
});
