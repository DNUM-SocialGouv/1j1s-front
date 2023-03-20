/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterFormationPage, { getServerSideProps } from '~/pages/formations/apprentissage/[id].page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
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
			const value = await getServerSideProps({ params: { id: '1' } } as GetServerSidePropsContext<{ id: string }>);

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
			it('retourne une page 404', async () => {
				const queryParam = {} as ParsedUrlQuery;

				const value = await getServerSideProps({ params: { id: '1' }, query: queryParam } as GetServerSidePropsContext<{ id: string }>);

				expect(value).toEqual({ notFound: true });
				expect(dependencies.formationDependencies.consulterFormation.handle).not.toHaveBeenCalled();
			});
		});

		describe('lorsque les query params sont remplis', () => {
			describe('lorsque le détail de la formation n‘existe pas', () => {
				it('retourne une page 404', async () => {
					const queryParam = {
						codeCommune: '13180',
						codeRomes: 'F1603',
						distanceCommune: '30',
						id: '1',
						latitudeCommune: '48.2',
						longitudeCommune: '29.10',
					} as ParsedUrlQuery;
					(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({ formation: createFailure(ErreurMétier.SERVICE_INDISPONIBLE) });

					const value = await getServerSideProps({
						params: { id: '1' },
						query: queryParam,
					} as GetServerSidePropsContext<{ id: string }>);

					expect(value).toEqual({ notFound: true });
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
						} as ParsedUrlQuery;
						(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({ formation: createSuccess(formation), statistiques: createFailure(ErreurMétier.SERVICE_INDISPONIBLE) });

						const value = await getServerSideProps({
							params: { id: '1' },
							query: queryParam,
						} as GetServerSidePropsContext<{ id: string }>);

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
						} as ParsedUrlQuery;
						(dependencies.formationDependencies.consulterFormation.handle as jest.Mock).mockReturnValue({ formation: createSuccess(formation), statistiques: createSuccess(statistiques) });

						const value = await getServerSideProps({
							params: { id: '1' },
							query: queryParam,
						} as GetServerSidePropsContext<{ id: string }>);

						expect(value).toEqual({ props: { formation: formation, statistiques: statistiques } });
					});
				});
			});
		});
	});
});

describe('Page Consulter Formations en Apprentissage', () => {
	it('retourne une page avec les informations de la formation', () => {
		mockUseRouter({ query: {} });
		const formation = aFormation();
		const analyticsService = anAnalyticsService();
		
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConsulterFormationPage formation={formation} />
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { name: formation.titre });
		expect(titre).toBeInTheDocument();
	});
	
	it('envoie les analytics de la page à son affichage', () => {
		mockUseRouter({ query: {} });
		const formation = aFormation();
		const analyticsService = anAnalyticsService();
		
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConsulterFormationPage formation={formation} />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_detail_niv_2',
			pagegroup: 'formation_apprentissage_detail',
			pagelabel: 'contenu_liste_niv_1',
			'segment-site': 'contenu_liste',
		});
	});
});
