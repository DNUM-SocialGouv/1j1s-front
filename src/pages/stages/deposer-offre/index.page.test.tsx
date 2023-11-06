/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import DeposerOffreStagePage from '~/pages/stages/deposer-offre/index.page';

describe('<DeposerOffreStagePage />', () => {
	it.todo('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<DeposerOffreStagePage/>
			</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<DeposerOffreStagePage />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
