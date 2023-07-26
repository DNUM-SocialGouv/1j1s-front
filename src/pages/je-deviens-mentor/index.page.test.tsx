/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeDeviensMentorPage from '~/pages/je-deviens-mentor/index.page';

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

		await screen.findByText('Faites la rencontre qui change tout !');

		expect(container).toBeAccessible();
	});
});
