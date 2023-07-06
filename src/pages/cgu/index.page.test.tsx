/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Cgu from '~/pages/cgu/index.page';
import { checkA11y } from '~/test-utils';

describe('<Cgu />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<Cgu titre={'titre'} contenu={'contenu'} />);
			</DependenciesProvider>);

		await checkA11y(container);
	});
});
