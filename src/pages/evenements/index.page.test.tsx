/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import PageEvenements from '~/pages/evenements/index.page';

describe('<PageEvenements />', () => {
	process.env = {
		...process.env,
		NEXT_PUBLIC_RECHERCHE_EVENEMENT_FEATURE: '0',
	};
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<PageEvenements />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<PageEvenements />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});
});
