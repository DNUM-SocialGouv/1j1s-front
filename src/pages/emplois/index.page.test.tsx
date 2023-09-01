/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherOffreEmploiPage from '~/pages/emplois/index.page';

describe('<RechercherOffreEmploiPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		mockSmallScreen();
		const user = userEvent.setup();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				offreService={anOffreService()}
				localisationService={aLocalisationService()}
			>
				<RechercherOffreEmploiPage />);
			</DependenciesProvider>);
		const rechercherButton = screen.getByRole('button', { name: 'Rechercher' });
		await user.click(rechercherButton);

		await screen.findByRole('list', { name: 'Offres d‘emplois' });

		expect(container).toBeAccessible();
	});
});
