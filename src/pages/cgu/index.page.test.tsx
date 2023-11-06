/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Cgu from '~/pages/cgu/index.page';

describe('<Cgu />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()}>
				<Cgu titre={'titre'} contenu={'contenu'}/>
			</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<Cgu titre={'titre'} contenu={'contenu'} />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
