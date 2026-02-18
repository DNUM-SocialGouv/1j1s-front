import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MesuresEmployeursPage from '~/pages/mesures-employeurs/index.page';
import { aMesuresEmployeursList } from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';

describe('<MesuresEmployeursPage />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<MesuresEmployeursPage mesureEmployeurList={aMesuresEmployeursList()} />
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}>
				<MesuresEmployeursPage mesureEmployeurList={aMesuresEmployeursList()} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
