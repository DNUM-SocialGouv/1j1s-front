/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MentionsLegales from '~/pages/mentions-legales/index.page';
import { checkA11y } from '~/test-utils';

describe('<MentionsLegales />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<MentionsLegales contenu={'contenu'} titre={'titre'} />);
			</DependenciesProvider>,
		);

		await checkA11y(container);
	});
});
