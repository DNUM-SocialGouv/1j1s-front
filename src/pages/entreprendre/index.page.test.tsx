/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Entreprendre from '~/pages/entreprendre/index.page';

describe('<Entreprendre />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<Entreprendre/>
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<Entreprendre />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
