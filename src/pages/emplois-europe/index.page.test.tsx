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
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aEmploiEuropeService } from '~/client/services/europe/emploiEurope.service.fixture';
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
		it('n‘a pas de défaut d‘accessibilité', async () => {
			const { container } = render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
					emploiEuropeService={aEmploiEuropeService()}
				>
					<EmploiEuropePage/>
				</DependenciesProvider>);
			await expect(container).toBeAccessible();
		});

		it('je vois le titre', async () => {
			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
					emploiEuropeService={aEmploiEuropeService()}
				>
					<EmploiEuropePage/>
				</DependenciesProvider>);

			expect(screen.getByRole('heading', {
				level: 1,
				name: 'Des milliers d‘offres d‘emplois en Europe sélectionnées pour vous par EURES',
			})).toBeVisible();
		});

		it('envoie les analytics', () => {
			const analyticsService = anAnalyticsService();
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					emploiEuropeService={aEmploiEuropeService()}
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

