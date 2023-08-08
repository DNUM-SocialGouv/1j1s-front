/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Page from '~/pages/maintenance-pole-emploi/index.page';

describe('<Page />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<Page />);
			</DependenciesProvider>,
		);

		await screen.findByText('Je découvre les dispositifs');

		expect(container).toBeAccessible();
	});
});
