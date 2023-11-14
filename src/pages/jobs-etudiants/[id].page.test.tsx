/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterJobÉtudiantPage from '~/pages/jobs-etudiants/[id].page';
import { aBarmanOffre } from '~/server/offres/domain/offre.fixture';

describe('<ConsulterJobÉtudiantPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const offre = aBarmanOffre();

		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConsulterJobÉtudiantPage jobÉtudiant={offre} />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
