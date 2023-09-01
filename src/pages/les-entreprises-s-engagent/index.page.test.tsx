/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import LesEntreprisesSEngagent from '~/pages/les-entreprises-s-engagent/index.page';

describe('<LesEntreprisesSEngagent />', () => {
	it('n‘a pas de défaut d‘accessibilité', () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<LesEntreprisesSEngagent />);
			</DependenciesProvider>,
		);

		expect(container).toBeAccessible();
	});
});
