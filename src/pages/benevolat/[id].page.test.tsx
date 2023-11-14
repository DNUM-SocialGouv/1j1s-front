/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterMissionEngagementPage from '~/pages/benevolat/[id].page';
import { anAmbassadeurDuDonDeVêtementMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('<ConsulterMissionEngagementPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const mission = anAmbassadeurDuDonDeVêtementMission();

		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConsulterMissionEngagementPage missionEngagement={mission} />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
