/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { RechercherJobÉtudiant } from '~/client/components/features/JobÉtudiant/Rechercher/RechercherJobÉtudiant';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import {
	anOffreService,
	aNoResultOffreService,
	aSingleResultOffreService,
} from '~/client/services/offre/offreService.fixture';

describe('RechercherJobÉtudiant', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de jobs étudiants,  avec un échantillon de résultat', async () => {
			// GIVEN
			const offreServiceMock = anOffreService();
			const localisationServiceMock = aLocalisationService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					offreService={offreServiceMock}
				>
					<RechercherJobÉtudiant/>
				</DependenciesProvider>,
			);

			// WHEN
			const formulaireRechercheOffreEmploi = screen.getByRole('form');
			expect(offreServiceMock.rechercherJobÉtudiant).toHaveBeenCalled();
			expect(await screen.findByText('3 offres de jobs étudiants')).toBeInTheDocument();
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
						<RechercherJobÉtudiant/>
					</DependenciesProvider>,
				);

				// THEN
				expect(offreServiceMock.rechercherJobÉtudiant).toHaveBeenCalledWith({
					codeLocalisation: '26',
					libelleLocalisation: 'BOURG LES VALENCE (26)',
					typeLocalisation: 'DEPARTEMENT',
				});
				expect(await screen.findByText('3 offres de jobs étudiants')).toBeInTheDocument();
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
						<RechercherJobÉtudiant/>
					</DependenciesProvider>,
				);

				// WHEN
				const résultatRechercheOffreEmploiList = await screen.findAllByTestId('RésultatRechercherSolution');
				const rechercheOffreEmploiNombreRésultats = await screen.findByText('3 offres de jobs étudiants pour boulanger');

				// THEN
				expect(résultatRechercheOffreEmploiList).toHaveLength(3);
				expect(rechercheOffreEmploiNombreRésultats).toBeInTheDocument();
				expect(offreServiceMock.rechercherJobÉtudiant).toHaveBeenCalledWith({ motCle: 'boulanger', page: '1' });
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
					<RechercherJobÉtudiant/>
				</DependenciesProvider>,
			);

			// WHEN
			const errorMessage = await screen.findByText('1 offre de job étudiant pour barman');

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
					<RechercherJobÉtudiant/>
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
				<RechercherJobÉtudiant/>
			</DependenciesProvider>,
		);

		await screen.findByText('3 offres de jobs étudiants');

		expect(offreService.rechercherJobÉtudiant).toHaveBeenCalledWith({
			page: '1',
		});
	});
});
