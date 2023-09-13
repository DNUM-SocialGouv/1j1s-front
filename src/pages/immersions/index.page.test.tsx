/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Immersions from '~/pages/immersions/index.page';

describe('<Immersions />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<Immersions />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
