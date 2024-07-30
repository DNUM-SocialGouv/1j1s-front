/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterFormationPage, { getServerSideProps } from '~/pages/formations/apprentissage/[id].page';
import { aGetServerSidePropsContext } from '~/server/aGetServerSidePropsContext.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aFormation } from '~/server/formations/domain/formation.fixture';
import { Statistique } from '~/server/formations/domain/statistique';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		formationDependencies: {
			consulterFormation: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('getServerSideProps', () => {
	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '0',
			};
		});
		it('retourne une page 404', async () => {
			const value = await getServerSideProps(aGetServerSidePropsContext<{ id: string }>({ params: { id: '1' } }));

			expect(value).toEqual({ notFound: true });
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '1',
			};
		});

		describe('lorsque les query params sont incorrects', () => {
			it('retourne en props une erreur Demande Incorrecte', async () => {

				const defaultStatusCode = 200;
				const context = aGetServerSidePropsContext<{ id: string }>({
					params: { id: '1' },
					query: {},
					res: { statusCode: defaultStatusCode },
				});
				
				const value = await getServerSideProps(context);

				expect(value).toEqual({ props: { error: ErreurMetier.DEMANDE_INCORRECTE } });
				expect(dependencies.formationDependencies.consulterFormation.handle).not.toHaveBeenCalled();
			});
		});

		describe('lorsque niveauEtudes n’est pas présent dans les query params', () => {
			it('effectue l’appel au use case avec niveauEtudes à undefined', async () => {
				const queryParam = {
					codeCommune: '13180',
					codeRomes: 'F1603',
					distanceCommune: '30',
					id: '1',
					latitudeCommune: '48.2',
					longitudeCommune: '29.10',
				};
				(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({ formation: createSuccess(aFormation()) });
				const context = aGetServerSidePropsContext<{ id: string }>({
					params: { id: '1' },
					query: queryParam,
				});
				
				await getServerSideProps(context);
				
				expect(dependencies.formationDependencies.consulterFormation.handle).toHaveBeenCalledWith('1', {
					codeCertification: '',
					codeCommune: '13180',
					codeRomes: ['F1603'],
					distanceCommune: '30',
					latitudeCommune: '48.2',
					longitudeCommune: '29.10',
					niveauEtudes: undefined,
				});
			});
		});

		describe('lorsque les query params sont remplis', () => {
			describe('lorsque le détail de la formation n‘existe pas', () => {
				it('retourne en props une erreur en fonction de la réponse du serveur', async () => {
					const queryParam = {
						codeCommune: '13180',
						codeRomes: 'F1603',
						distanceCommune: '30',
						id: '1',
						latitudeCommune: '48.2',
						longitudeCommune: '29.10',
						niveauEtudes: '6',
					};
					(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({ formation: createFailure(ErreurMetier.SERVICE_INDISPONIBLE) });

					const defaultStatusCode = 200;
					const context = aGetServerSidePropsContext<{ id: string }>({
						params: { id: '1' },
						query: queryParam,
						res: { statusCode: defaultStatusCode },
					});

					const value = await getServerSideProps(context);

					expect(value).toEqual({ props: { error: ErreurMetier.SERVICE_INDISPONIBLE } });
				});
			});

			describe('lorsque le détail de la formation existe', () => {
				describe('lorsque les statistiques de la formation n‘existent pas', () => {
					it('retourne les props de la page sans statistiques', async () => {
						const formation = aFormation();
						const queryParam = {
							codeCommune: '13180',
							codeRomes: 'F1603',
							distanceCommune: '30',
							id: '1',
							latitudeCommune: '48.2',
							longitudeCommune: '29.10',
							niveauEtudes: '6',
						};
						(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({
							formation: createSuccess(formation),
							statistiques: createFailure(ErreurMetier.SERVICE_INDISPONIBLE),
						});
						const context = aGetServerSidePropsContext<{ id: string }>({
							params: { id: '1' },
							query: queryParam,
						});

						const value = await getServerSideProps(context);

						expect(value).toEqual({ props: { formation: formation } });
					});
				});
				describe('lorque les statistiques de la formation existent', () => {
					it('retourne les props de la page avec les statistiques', async () => {
						const formation = aFormation();
						const statistiques: Statistique = {
							millesime: '2020',
							region: 'Provence-Alpes-Côte d‘Azur',
							tauxAutres6Mois: '0.2',
							tauxEnEmploi6Mois: '0.0',
							tauxEnFormation: '0.1',
						};
						const queryParam = {
							codeCommune: '13180',
							codeRomes: 'F1603',
							distanceCommune: '30',
							id: '1',
							latitudeCommune: '48.2',
							longitudeCommune: '29.10',
							niveauEtudes: '6',
						};
						(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({
							formation: createSuccess(formation),
							statistiques: createSuccess(statistiques),
						});

						const context = aGetServerSidePropsContext<{ id: string }>({
							params: { id: '1' },
							query: queryParam,
						});
						const value = await getServerSideProps(context);

						expect(value).toEqual({ props: { formation: formation, statistiques: statistiques } });
					});
				});
				describe('lorsqu un paramètre supplémentaire est fourni en query', () => {
					// Test ajouté suite à un bug
					it('retourne quand même les props de la page avec les statistiques', async () => {
						const formation = aFormation();
						const statistiques: Statistique = {
							millesime: '2020',
							region: 'Provence-Alpes-Côte d‘Azur',
							tauxAutres6Mois: '0.2',
							tauxEnEmploi6Mois: '0.0',
							tauxEnFormation: '0.1',
						};
						const queryParam = {
							codeCommune: '13180',
							codeRomes: 'F1603',
							distanceCommune: '30',
							id: '1',
							latitudeCommune: '48.2',
							longitudeCommune: '29.10',
							niveauEtudes: '6',
							parametreSupplementaire: 'foobarbaz',
						};
						(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({
							formation: createSuccess(formation),
							statistiques: createSuccess(statistiques),
						});

						const context = aGetServerSidePropsContext<{ id: string }>({
							params: { id: '1' },
							query: queryParam,
						});
						const value = await getServerSideProps(context);

						expect(value).toEqual({ props: { formation: formation, statistiques: statistiques } });
					});
				});
			});
		});
	});
});

describe('Page Consulter Formations en Apprentissage', () => {
	it('doit rendre du HTML respectant la specification', () => {
		const formation = aFormation();
		mockUseRouter({});

		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterFormationPage formation={formation}/>
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const formation = aFormation();
		const analyticsService = aManualAnalyticsService();
		mockUseRouter({});

		const { container } = render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				analyticsService={analyticsService}>
				<ConsulterFormationPage formation={formation}/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('retourne une page avec les informations de la formation', () => {
		mockUseRouter({ query: {} });
		const formation = aFormation();
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				analyticsService={analyticsService}>
				<ConsulterFormationPage formation={formation}/>
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { name: formation.titre });
		expect(titre).toBeInTheDocument();
	});

	it('envoie les analytics de la page à son affichage', () => {
		mockUseRouter({ query: {} });
		const formation = aFormation();
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				analyticsService={analyticsService}>
				<ConsulterFormationPage formation={formation}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_detail_niv_2',
			pagegroup: 'formation_apprentissage_detail',
			pagelabel: 'contenu_detail_niv_2',
			'segment-site': 'contenu_detail',
		});
	});
});
