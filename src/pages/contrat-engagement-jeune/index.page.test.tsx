/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import { aMarketingService } from '~/client/services/marketing/marketing.service.fixture';
import ContratEngagementJeune from '~/pages/contrat-engagement-jeune/index.page';

describe('Contrat engagement jeune', () => {
	let analyticsService: ManualAnalyticsService;
	let marketingService: MarketingService;

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
		marketingService = aMarketingService();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
				<ContratEngagementJeune/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	describe('marketingService', () => {
		it('ne track pas la page si le feature flipping de la campagne CEJ est désactivé', () => {

			process.env.NEXT_PUBLIC_CAMPAGNE_CEJ_FEATURE = '0';
			render(
				<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
					<ContratEngagementJeune/>
				</DependenciesProvider>,
			);

			expect(marketingService.trackPage).not.toHaveBeenCalled();
		});
		it('track la page avec le bon nom de page si le feature flipping de la campagne CEJ est activé', () => {

			process.env.NEXT_PUBLIC_CAMPAGNE_CEJ_FEATURE = '1';
			render(
				<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
					<ContratEngagementJeune/>
				</DependenciesProvider>,
			);

			expect(marketingService.trackPage).toHaveBeenCalledWith('2023-10-1jeune1solution.gouv.fr-PageArrivee-ContratEngagementJeune');
		});
	});
});
