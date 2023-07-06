/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeDeviensMentorPage from '~/pages/je-deviens-mentor/index.page';
import { checkA11y } from '~/test-utils';

describe('<JeDeviensMentorPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
    
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<JeDeviensMentorPage />
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
