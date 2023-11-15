/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMissionEngagementService } from '~/client/services/missionEngagement/missionEngagementService.fixture';
import RechercherMissionBénévolatPage from '~/pages/benevolat/index.page';

describe('<RechercherMissionBénévolatPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				localisationService={aLocalisationService()}
				missionEngagementService={aMissionEngagementService()}
			>
				<RechercherMissionBénévolatPage />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
