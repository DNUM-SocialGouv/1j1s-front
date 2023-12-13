/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MentionsLegales from '~/pages/mentions-legales/index.page';

describe('<MentionsLegales />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockSmallScreen();
		mockUseRouter({});

		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<MentionsLegales titre={'titre'} contenu={'contenu'}/>
		</DependenciesProvider> );
		
		expect(container.outerHTML).toHTMLValidate();
	});
		
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<MentionsLegales contenu={'contenu'} titre={'titre'} />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
