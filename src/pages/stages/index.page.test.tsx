/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { aRechercheClientService } from '~/client/components/layouts/InstantSearch/InstantSearchLayout.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aRoutingService } from '~/client/services/routing/routing.service.fixture';
import RechercherOffreStagePage from '~/pages/stages/index.page';

jest.mock('react-instantsearch', () => ({
	...jest.requireActual('react-instantsearch'),
	Configure: () => <></>,
}));

describe('<RechercherOffreStagePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				rechercheClientService={aRechercheClientService()}
				routingService={aRoutingService()}
			>
				<RechercherOffreStagePage />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
