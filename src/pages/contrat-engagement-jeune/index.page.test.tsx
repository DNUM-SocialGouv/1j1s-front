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
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ContratEngagementJeune from '~/pages/contrat-engagement-jeune/index.page';

describe('Contrat engagement jeune', () => {
	let analyticsService: ManualAnalyticsService;

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = aManualAnalyticsService();
	});

	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(<DependenciesProvider analyticsService={analyticsService}>
			<ContratEngagementJeune />
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ContratEngagementJeune />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
