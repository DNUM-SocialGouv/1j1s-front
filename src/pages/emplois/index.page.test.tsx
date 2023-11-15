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
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

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
			});
		});
	});
});
