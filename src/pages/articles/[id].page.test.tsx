/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterArticlePage from '~/pages/articles/[id].page';
import { checkA11y } from '~/test-utils';

describe('<ConsulterArticlePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const article = {
			bannière: {
				alt: 'alt',
				src: 'url',
			},
			contenu: 'contenu',
			slug: 'slug',
			titre: 'titre',
		};
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterArticlePage article={article} />);
			</DependenciesProvider>);

		await checkA11y(container);
	});
});
