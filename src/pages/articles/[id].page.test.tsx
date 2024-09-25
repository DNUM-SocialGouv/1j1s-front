/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aDateService } from '~/client/services/date/date.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterArticlePage from '~/pages/articles/[id].page';
import { anArticle } from '~/server/articles/domain/article.fixture';

describe('<ConsulterArticlePage />', () => {
	beforeEach(() => {
		mockUseRouter({});
		mockSmallScreen();
	});
	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticlePage article={anArticle()} />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticlePage article={anArticle()} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
