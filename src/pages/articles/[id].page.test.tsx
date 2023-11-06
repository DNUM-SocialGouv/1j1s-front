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
import { Article } from '~/server/cms/domain/article';
import { anArticle } from '~/server/cms/domain/article.fixture';

describe('<ConsulterArticlePage />', () => {
	let article: Article;
	beforeEach(() => {
		article = anArticle();
		mockUseRouter({});
		mockSmallScreen();
	});
	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<ConsulterArticlePage article={article}/>
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {

		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConsulterArticlePage article={article} />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});
});
