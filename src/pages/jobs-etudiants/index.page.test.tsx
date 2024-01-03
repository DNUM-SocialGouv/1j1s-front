/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import RechercherJobÉtudiantPage, { getServerSideProps } from '~/pages/jobs-etudiants/index.page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		offreJobÉtudiantDependencies: {
			rechercherOffreJobÉtudiant: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('<RechercherJobEtudiantPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				localisationService={aLocalisationService()}
			>
				<RechercherJobÉtudiantPage />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	describe('getServerSideProps', () => {
		beforeEach(() => {
			jest.resetAllMocks();
		});

		describe('lorsque la recherche est lancée sans query params', () => {
			it('retourne un résultat vide', async () => {
				// GIVEN
				const context = {
					query: {},
				} as GetServerSidePropsContext;

				// WHEN
				const result = await getServerSideProps(context);

				// THEN
				expect(result).toEqual({
					props: {},
				});
				expect(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle).not.toHaveBeenCalled();
			});
		});

		describe('lorsque la recherche est lancée avec des query params', () => {
			it('filtre les offres et retourne le résultat', async () => {
				// GIVEN
				(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle as jest.Mock).mockReturnValue(createSuccess(aRésultatsRechercheOffre()));

				const context = {
					query: {
						page: 1,
					},
				} as unknown as GetServerSidePropsContext;

				// WHEN
				const result = await getServerSideProps(context);

				// THEN
				expect(result).toEqual({
					props: {
						resultats: aRésultatsRechercheOffre(),
					},
				});
				expect(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle).toHaveBeenCalledWith({
					page: 1,
				});
			});

			describe('lorsque la recherche retourne une erreur', () => {
				it('retourne une erreur de service indisponible', async () => {
					// GIVEN
					(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle as jest.Mock).mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
					const context = {
						query: {
							page: 1,
						},
					} as unknown as GetServerSidePropsContext;

					// WHEN
					const result = await getServerSideProps(context);

					// THEN
					expect(result).toEqual({
						props: {
							erreurRecherche: ErreurMetier.SERVICE_INDISPONIBLE,
						},
					});
					expect(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle).toHaveBeenCalledWith({
						page: 1,
					});
				});
			});
		});

		describe('lorsque la recherche est lancée avec des query params invalides', () => {
			it('retourne une erreur de demande incorrecte', async () => {
				// GIVEN
				const context = {
					query: {
						page: 'invalid',
					},
				} as unknown as GetServerSidePropsContext;

				// WHEN
				const result = await getServerSideProps(context);

				// THEN
				expect(result).toEqual({
					props: {
						erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE,
					},
				});
				expect(dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle).not.toHaveBeenCalled();
			});
		});
	});
});
