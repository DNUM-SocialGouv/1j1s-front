/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherOffreEmploiPage, { getServerSideProps } from '~/pages/emplois/index.page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		offreEmploiDependencies: {
			rechercherOffreEmploi: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page Emploi', () => {
	describe('<RechercherOffreEmploiPage />', () => {
		it('n‘a pas de défaut d‘accessibilité', async () => {
			mockUseRouter({ query: { page: '1' } });
			mockLargeScreen();

			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					offreService={anOffreService()}
					localisationService={aLocalisationService()}
				>
					<RechercherOffreEmploiPage resultats={aRésultatsRechercheOffre()} />);
				</DependenciesProvider>);

			await screen.findByRole('list', { name: /Offres d‘emplois/i });
			await expect(container).toBeAccessible();
		});

		describe('lorsque la page est chargée sans query params', () => {
			it('redirige vers la page 1', async () => {
				// GIVEN
				const routerReplace = jest.fn();
				mockUseRouter({ isReady: true, query: {}, replace: routerReplace });
				mockLargeScreen();
				const offres = {
					nombreRésultats: 0,
					résultats: [],
				};

				// WHEN
				render(
					<DependenciesProvider
						analyticsService={aManualAnalyticsService()}
						offreService={anOffreService()}
						localisationService={aLocalisationService()}
					>
						<RechercherOffreEmploiPage resultats={offres} />);
					</DependenciesProvider>,
				);

				// THEN
				expect(routerReplace).toHaveBeenCalledWith({ query: 'page=1' }, undefined, { scroll: false });
			});
		});
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
				expect(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle).not.toHaveBeenCalled();
			});
		});

		describe('lorsque la recherche est lancée avec des query params', () => {
			it('filtre les offres et retourne le résultat', async () => {
				// GIVEN
				(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle as jest.Mock).mockReturnValue(createSuccess(aRésultatsRechercheOffre()));

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
				expect(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle).toHaveBeenCalledWith({
					page: 1,
				});
			});

			describe('lorsque la recherche retourne une erreur', () => {
				it('retourne une erreur de service indisponible', async () => {
					// GIVEN
					(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle as jest.Mock).mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
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
					expect(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle).toHaveBeenCalledWith({
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
				expect(dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle).not.toHaveBeenCalled();
			});
		});
	});
});
