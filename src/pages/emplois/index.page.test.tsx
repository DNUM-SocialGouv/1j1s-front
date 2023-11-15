/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherOffreEmploiPage from '~/pages/emplois/index.page';

describe('<RechercherOffreEmploiPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				offreService={anOffreService()}
				localisationService={aLocalisationService()}
			>
				<RechercherOffreEmploiPage />);
			</DependenciesProvider>);

		await screen.findByRole('list', { name: /Offres d‘emplois/i });
		await expect(container).toBeAccessible();
	});
});
