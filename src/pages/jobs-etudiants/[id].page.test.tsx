import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterJobÉtudiantPage from '~/pages/jobs-etudiants/[id].page';
import { anOffreEmploi } from '~/server/offres/domain/offre.fixture';

describe('<ConsulterJobÉtudiantPage />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});

		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobÉtudiantPage jobÉtudiant={anOffreEmploi()} />
			</DependenciesProvider>,
		);
		
		expect(container.outerHTML).toHTMLValidate();
	});
		
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const offre = anOffreEmploi();

		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider analyticsService={aManualAnalyticsService()} sessionStorageService={aStorageService()}>
				<ConsulterJobÉtudiantPage jobÉtudiant={offre} />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
