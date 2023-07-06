/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MonEspace from '~/pages/mon-espace/index.page';
import { checkA11y } from '~/test-utils';

describe('<MonEspace />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<MonEspace />);
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
