/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import RechercherJobÉtudiantPage from '~/pages/jobs-etudiants/index.page';

describe('<RechercherJobsEtePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<RechercherJobÉtudiantPage />);
			</DependenciesProvider>,
		);
    
		expect(container).toBeAccessible();
	});
});
