/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeRecruteAfprPoeiPage from '~/pages/je-recrute-afpr-poei/index.page';

describe('<JeRecruteAfprPoeiPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<JeRecruteAfprPoeiPage />
			</DependenciesProvider>,
		);

		expect(container).toBeAccessible();
	});
});
