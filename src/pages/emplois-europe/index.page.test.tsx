/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import {
	render,
	screen,
} from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { anEmploiEuropeService } from '~/client/services/europe/emploiEurope.service.fixture';
import EmploiEuropePage, { getServerSideProps } from '~/pages/emplois-europe/index.page';

describe('Page emplois en europe', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	describe('lorsque la feature n‘est pas activée', () => {
		it('retourne une page 404', async () => {
			process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '0';

			const result = await getServerSideProps();
			expect(result).toMatchObject({ notFound: true });
		});
	});

	describe('lorsque la feature est activée', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE = '1';
			mockUseRouter({});
			mockSmallScreen();
		});
		it.todo('doit rendre du HTML respectant la specification');
it('n‘a pas de défaut d‘accessibilité', async () => {
			mockUseRouter({
				query: {
					page: '1',
				},
			});
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					emploiEuropeService={anEmploiEuropeService()}
				>
					<EmploiEuropePage/>
				</DependenciesProvider>);
			await expect(container).toBeAccessible();
		});

		it('je vois le titre', async () => {
			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					emploiEuropeService={anEmploiEuropeService()}
				>
					<EmploiEuropePage/>
				</DependenciesProvider>);

			expect(screen.getByRole('heading', {
				level: 1,
				name: 'Des milliers d‘offres d‘emplois en Europe sélectionnées pour vous par EURES',
			})).toBeVisible();
		});

		it('envoie les analytics', () => {
			const analyticsService = aManualAnalyticsService();
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					emploiEuropeService={anEmploiEuropeService()}
				>
					<EmploiEuropePage/>
				</DependenciesProvider>,
			);

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'emplois_liste',
				pagegroup: 'emplois_europe',
				pagelabel: 'emplois_liste',
				'segment-site': 'offres_d_emploi',
			});
		});
	});
});

