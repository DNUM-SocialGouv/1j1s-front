/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Confidentialite from '~/pages/confidentialite/index.page';
import { checkA11y } from '~/test-utils';

describe('<Confidentialite />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<Confidentialite titre={'titre'} contenu={'contenu'}  />);
			</DependenciesProvider>);

		await checkA11y(container);
	});
});
