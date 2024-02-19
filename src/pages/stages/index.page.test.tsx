/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { aRechercheClientService } from '~/client/components/layouts/InstantSearch/InstantSearchLayout.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
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
			>
				<RechercherOffreStagePage />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
	it('doit rendre du HTML respectant la specification', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				rechercheClientService={aRechercheClientService()}
			>
				<RechercherOffreStagePage />
			</DependenciesProvider>,
		);

		await screen.findByText('Des milliers d‘offres de stages');

		expect(container.outerHTML).toHTMLValidate();
	});
});
