/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import LesEntreprisesSEngagent from '~/pages/les-entreprises-s-engagent/index.page';
import { checkA11y } from '~/test-utils';

describe('<LesEntreprisesSEngagent />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<LesEntreprisesSEngagent />);
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
