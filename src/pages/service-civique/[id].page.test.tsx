/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterMissionEngagementPage from '~/pages/service-civique/[id].page';
import { anAmbassadeurDuDonDeVêtementMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { checkA11y } from '~/test-utils';

describe('<ConsulterMissionEngagementPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterMissionEngagementPage missionEngagement={anAmbassadeurDuDonDeVêtementMission()} />
			</DependenciesProvider>,
		);

		await checkA11y(container);
	});
});
