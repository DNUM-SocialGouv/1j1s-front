/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterMissionEngagementPage from '~/pages/service-civique/[id].page';
import { anAmbassadeurDuDonDeVêtementMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('<ConsulterMissionEngagementPage />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});

		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterMissionEngagementPage missionEngagement={anAmbassadeurDuDonDeVêtementMission()} />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				analyticsService={aManualAnalyticsService()}>
				<ConsulterMissionEngagementPage missionEngagement={anAmbassadeurDuDonDeVêtementMission()} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
