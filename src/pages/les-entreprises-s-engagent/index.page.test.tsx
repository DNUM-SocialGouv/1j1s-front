/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import LesEntreprisesSEngagent from '~/pages/les-entreprises-s-engagent/index.page';

describe('<LesEntreprisesSEngagent />', () => {
	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<LesEntreprisesSEngagent />
		</DependenciesProvider>);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}>
				<LesEntreprisesSEngagent />);
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('je vois le lien pour rejoindre la mobilisation', () => {
		process.env.NEXT_PUBLIC_LES_ENTREPRISES_S_ENGAGENT_URL = 'http://url.com';

		render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<LesEntreprisesSEngagent />
		</DependenciesProvider>);

		expect(screen.getByRole('link', { name: 'Rejoindre la mobilisation - nouvelle fenêtre' })).toHaveAttribute('href', 'http://url.com');
	});
});
