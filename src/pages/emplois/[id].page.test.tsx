/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterOffreEmploiPage from '~/pages/emplois/[id].page';
import { aBarmanOffre } from '~/server/offres/domain/offre.fixture';

describe('<ConsulterOffreEmploiPage />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		mockUseRouter({});
		mockSmallScreen();
		const offre = aBarmanOffre();

		const { container } =			render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<ConsulterOffreEmploiPage offreEmploi={offre}/>
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();
		const offre = aBarmanOffre();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConsulterOffreEmploiPage offreEmploi={offre} />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
