/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JeRecruteAfprPoeiPage from '~/pages/je-recrute-afpr-poei/index.page';

describe('<JeRecruteAfprPoeiPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<JeRecruteAfprPoeiPage />
			</DependenciesProvider>,
		);

		await screen.findByText('Je m’engage à recruter des candidats formés avec l’aide de Pôle emploi (AFPR/POEI)');

		expect(container).toBeAccessible();
	});
});
