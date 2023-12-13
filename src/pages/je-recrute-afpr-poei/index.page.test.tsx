/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeRecruteAfprPoeiPage from '~/pages/je-recrute-afpr-poei/index.page';

describe('<JeRecruteAfprPoeiPage />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockSmallScreen();

		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<JeRecruteAfprPoeiPage/>
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<JeRecruteAfprPoeiPage />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
