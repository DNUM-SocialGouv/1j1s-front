/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Immersions from '~/pages/immersions/index.page';
import { checkA11y } from '~/test-utils';

describe('<Immersions />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<Immersions />
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
