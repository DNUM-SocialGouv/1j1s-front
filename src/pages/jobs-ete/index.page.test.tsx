/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen, waitFor } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import RechercherJobsEtePage, { getServerSideProps } from '~/pages/jobs-ete/index.page';
import { aGetServerSidePropsContext } from '~/server/aGetServerSidePropsContext.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { anOffreEmploi, aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		offreJobEteDependencies: {
			rechercherOffreJobEte: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page rechercher un job d‘été', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	describe('quand le feature flip n‘est pas actif', () => {
		it('affiche la page non trouvée', async () => {
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';
			mockUseRouter({ query: { page: '1' } });

			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					localisationService={aLocalisationService()}>
					<RechercherJobsEtePage />
				</DependenciesProvider>,
			);

			await waitFor(async () => {
				const result = await getServerSideProps(aGetServerSidePropsContext());
				expect(result).toMatchObject({ notFound: true });
			});
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
		});

		it('affiche le titre de la page job d’été', async () => {
			mockUseRouter({ query: { page: '1' } });

			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					localisationService={aLocalisationService()}>
					<RechercherJobsEtePage />
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent(/Des milliers de jobs d’été/i);
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const analyticsService = aManualAnalyticsService();
			mockUseRouter({ query: { page: '1' } });

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					localisationService={aLocalisationService()}>
					<RechercherJobsEtePage />
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { level: 1 });
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'emplois_liste',
				pagegroup: 'job_ete',
				pagelabel: 'emplois_liste',
				'segment-site': 'offres_d_emploi',
			});
		});

		it('n‘a pas de défaut d‘accessibilité', async () => {
			const analyticsService = aManualAnalyticsService();
			mockUseRouter({ query: { page: '1' } });

			const { container } = render(
				<DependenciesProvider
					analyticsService={analyticsService}
					localisationService={aLocalisationService()}>
					<RechercherJobsEtePage resultats={aRésultatsRechercheOffre()} />
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { level: 3, name: anOffreEmploi().intitulé });

			await expect(container).toBeAccessible();
		});

		describe('getServerSideProps', () => {
			beforeEach(() => {
				jest.resetAllMocks();
			});

			describe('lorsque la recherche est lancée sans query params', () => {
				it('retourne un résultat vide', async () => {
					const result = await getServerSideProps(aGetServerSidePropsContext({ query: {} }));

					expect(result).toEqual({ props: {} });
					expect(dependencies.offreJobEteDependencies.rechercherOffreJobEte.handle).not.toHaveBeenCalled();
				});
			});

			describe('lorsque la recherche est lancée avec des query params', () => {
				it('filtre les offres et retourne le résultat', async () => {
					// GIVEN
					(dependencies.offreJobEteDependencies.rechercherOffreJobEte.handle as jest.Mock).mockReturnValue(createSuccess(aRésultatsRechercheOffre()));

					// WHEN
					const result = await getServerSideProps(aGetServerSidePropsContext({ query: { page: '1' } }));

					// THEN
					expect(result).toEqual({
						props: {
							resultats: aRésultatsRechercheOffre(),
						},
					});
					expect(dependencies.offreJobEteDependencies.rechercherOffreJobEte.handle).toHaveBeenCalledWith({
						page: 1,
					});
				});

				describe('lorsque la recherche retourne une erreur', () => {
					it('retourne une erreur de service indisponible et change le status de la page', async () => {
						// GIVEN
						const defaultStatusCode = 200;
						jest.spyOn(dependencies.offreJobEteDependencies.rechercherOffreJobEte, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

						const context = aGetServerSidePropsContext({
							query: { page: '1' },
							res: { statusCode: defaultStatusCode },
						});

						// WHEN
						const result = await getServerSideProps(context);

						// THEN
						expect(result).toEqual({ props: { erreurRecherche: ErreurMetier.SERVICE_INDISPONIBLE } });
						expect(context.res.statusCode).toEqual(500);
					});
				});
			});

			describe('lorsque la recherche est lancée avec des query params invalides', () => {
				it('retourne une erreur de demande incorrecte', async () => {
					// GIVEN
					const context = aGetServerSidePropsContext({ query: { page: 'invalid' } });

					// WHEN
					const result = await getServerSideProps(context);

					// THEN
					expect(result).toEqual({
						props: {
							erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE,
						},
					});
					expect(dependencies.offreJobEteDependencies.rechercherOffreJobEte.handle).not.toHaveBeenCalled();
				});
			});
		});
	});
});
