/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import EuropePage from '~/pages/europe/index.page';

describe('Page Europe', () => {
	let analyticsService: ManualAnalyticsService;
	beforeEach(() => {
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<EuropePage />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});

	it('affiche le contenu de la page', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: 'Je cherche une expérience en Europe' });
		expect(titre).toBeVisible();
		const contenu = screen.getByRole('main');
		expect(contenu).toBeVisible();
	});
});
