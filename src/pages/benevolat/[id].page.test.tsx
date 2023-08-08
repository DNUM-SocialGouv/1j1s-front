/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMissionEngagementService } from '~/client/services/missionEngagement/missionEngagementService.fixture';
import ConsulterMissionEngagementPage from '~/pages/benevolat/[id].page';

describe('<ConsulterMissionEngagementPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const mission = {
			description: 'description',
			duréeContrat: 1,
			débutContrat: 'débutContrat',
			id: 'MissionId',
			localisation: 'localisation',
			nomEntreprise: 'nomEntreprise',
			openToMinors: 'openToMinors',
			titre: 'titre',
			url: 'url',
			étiquetteList: ['étiquetteList'],
		};
		
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				localisationService={aLocalisationService()}
				missionEngagementService={aMissionEngagementService()}
			>
				<ConsulterMissionEngagementPage missionEngagement={mission} />);
			</DependenciesProvider>);

		expect(container).toBeAccessible();
	});
});
