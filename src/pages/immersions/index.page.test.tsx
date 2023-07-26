/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

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

		await screen.findByText('Je référence mon entreprise afin de proposer des immersions');

		expect(container).toBeAccessible();
	});
});
