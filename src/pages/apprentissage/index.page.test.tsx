/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import RechercherAlternancePage, { getServerSideProps } from '~/pages/apprentissage/index.page';
import { aGetServerSidePropsContext } from '~/server/aGetServerSidePropsContext.fixture';
import { Alternance } from '~/server/alternances/domain/alternance';
import {
	aDetailMatchaAlternance,
	aDetailPEJobAlternance,
	aRechercheAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		alternanceDependencies: {
			rechercherAlternance: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page rechercher une alternance', () => {
	describe('<RechercherAlternancePage />', () => {
		beforeEach(() => {
			mockSmallScreen();
		});

		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '1',
			};
		});

		it('n‘a pas de défaut d‘accessibilité', async () => {
			const alternanceFixture: Array<Alternance> = [
				aDetailMatchaAlternance(),
				aDetailPEJobAlternance(),
			];
			const resultats = aRechercheAlternance({
				entrepriseList: [],
				offreList: alternanceFixture,
			});
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMetierService();
			mockUseRouter({
				query: {
					codeCommune: '75056',
					codePostal: '75001',
					codeRomes: 'D1102%2CD1104',
					distanceCommune: '10',
					latitudeCommune: '48.859',
					libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
					longitudeCommune: '2.347',
					page: '1',
					ville: 'Paris',
				},
			});
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					localisationService={localisationServiceMock}
					metierLbaService={métiersServiceMock}
				>
					<RechercherAlternancePage resultats={resultats} />
				</DependenciesProvider>,
			);

			await screen.findByText(`${alternanceFixture.length} résultats pour Boulangerie, pâtisserie, chocolaterie`);
			await expect(container).toBeAccessible();
		});

		it('affiche le titre propre à la bonne alternance', async () => {
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMetierService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					localisationService={localisationServiceMock}
					metierLbaService={métiersServiceMock}
				>
					<RechercherAlternancePage />
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent(/Avec La bonne alternance/i);
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMetierService();
			const analyticsService = aManualAnalyticsService();

			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					localisationService={localisationServiceMock}
					metierLbaService={métiersServiceMock}
				>
					<RechercherAlternancePage />
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { level: 1 });
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'emplois_liste',
				pagegroup: 'apprentissage',
				pagelabel: 'emplois_liste',
				'segment-site': 'offres_d_emploi',
			});
		});
	});

	describe('getServerSideProps', () => {
		beforeEach(() => {
			jest.resetAllMocks();
		});

		describe('lorsque le feature flipping est désactivé', () => {
			beforeEach(() => {
				process.env = {
					...process.env,
					NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '0',
				};
			});
			it('redirige vers la page 404', async () => {
				const result = await getServerSideProps(aGetServerSidePropsContext());

				expect(result).toEqual({ notFound: true });
			});
		});

		describe('lorsque la recherche est lancée avec des query params', () => {
			beforeEach(() => {
				process.env = {
					...process.env,
					NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '1',
				};
			});
			describe('lorsque la page est affichée sans query params', () => {
				it('retourne des props vide pour que le composant front n’affiche pas de résultat', async () => {
					const result = await getServerSideProps(aGetServerSidePropsContext());

					expect(result).toEqual({
						props: {},
					});
				});
			});

			describe('lorsque la page est affichée avec des query params', () => {
				describe('lorsque les query params sont invalides', () => {
					it('retourne une erreur et ne fait pas de recherche', async () => {
						// GIVEN
						const context = aGetServerSidePropsContext({ query: { queryInvalide: '75056' } });

						// WHEN
						const result = await getServerSideProps(context);

						// THEN
						expect(result).toEqual({ props: { erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE } });
						expect(dependencies.alternanceDependencies.rechercherAlternance.handle).not.toHaveBeenCalled();
					});
				});

				describe('lorsque les query params sont valides', () => {
					describe('lorsque la recherche retourne une erreur', () => {
						it('retourne l’erreur reçue et change le status de la page', async () => {
							// GIVEN
							jest.spyOn(dependencies.alternanceDependencies.rechercherAlternance, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

							const defaultStatusCode = 200;
							const context = aGetServerSidePropsContext({
								query: {
									codeCommune: '75056',
									codeRomes: 'D1102',
									distanceCommune: '10',
									latitudeCommune: '48.859',
									longitudeCommune: '2.347',
								},
								res: { statusCode: defaultStatusCode },
							});

							// WHEN
							const result = await getServerSideProps(context);

							// THEN
							expect(result).toEqual({ props: { erreurRecherche: ErreurMetier.SERVICE_INDISPONIBLE } });
							expect(context.res.statusCode).toEqual(500);
						});
					});

					describe('lorsque la recherche retourne un résultat', () => {
						it('retourne le résultat', async () => {
							// GIVEN
							jest.spyOn(dependencies.alternanceDependencies.rechercherAlternance, 'handle').mockResolvedValue(createSuccess(aRechercheAlternance()));

							const context = aGetServerSidePropsContext({
								query: {
									codeCommune: '75056',
									codeRomes: 'D1102',
									distanceCommune: '10',
									latitudeCommune: '48.859',
									longitudeCommune: '2.347',
								},
							});

							// WHEN
							const result = await getServerSideProps(context);

							// THEN
							expect(result).toEqual({
								props: {
									resultats: aRechercheAlternance(),
								},
							});
							expect(dependencies.alternanceDependencies.rechercherAlternance.handle).toHaveBeenCalledWith({
								codeCommune: '75056',
								codeRomes: ['D1102'],
								distanceCommune: '10',
								latitudeCommune: '48.859',
								longitudeCommune: '2.347',
							});
						});
					});
				});
			});
		});
	});
});
