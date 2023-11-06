/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherJobÉtudiantPage from '~/pages/jobs-etudiants/index.page';

describe('<RechercherJobEtudiantPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				offreService={anOffreService()}
				localisationService={aLocalisationService()}
			>
				<RechercherJobÉtudiantPage />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
