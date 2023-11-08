/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterArticlePage from '~/pages/articles/[id].page';
import { anArticle } from '~/server/cms/domain/article.fixture';

describe('<ConsulterArticlePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const article = anArticle();
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConsulterArticlePage article={article} />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
