/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeRecrutePage from '~/pages/je-recrute/index.page';
import { checkA11y } from '~/test-utils';

describe('<JeRecrutePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<JeRecrutePage />
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
