/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMissionEngagementService } from '~/client/services/missionEngagement/missionEngagementService.fixture';
import RechercherMissionServiceCiviquePage from '~/pages/service-civique/index.page';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('<RechercherMissionServiceCiviquePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				localisationService={aLocalisationService()}
				missionEngagementService={aMissionEngagementService()}
			>
				<RechercherMissionServiceCiviquePage />);
			</DependenciesProvider>);

		await screen.findByRole('heading', { level: 3, name: aRésultatRechercheMission().résultats[0].titre });

		await expect(container).toBeAccessible();
	});
});
