/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterArticlePage from '~/pages/articles/[id].page';

describe('<ConsulterArticlePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const article = {
			bannière: {
				alt: 'alt',
				src: 'url',
			},
			contenu: 'Retrouvez ici une liste d\'interviews qui pourraient vous intéresser ! \n' +
				'\n' +
				'Interview Engie : [https://recette.1jeune1solution.gouv.fr/articles/interview-engie-par-canaljob](https://recette.1jeune1solution.gouv.fr/articles/interview-engie-par-canaljob)\n' +
				'\n' +
				'Interview test : [https://recette.1jeune1solution.gouv.fr/articles/test-canal-job](https://recette.1jeune1solution.gouv.fr/articles/test-canal-job)',
			slug: 'plein-d-interviews-pour-presenter-des-entreprises',
			titre: 'Plein d\'interviews pour présenter des entreprises',
		};
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterArticlePage article={article} />);
			</DependenciesProvider>);

		expect(container).toBeAccessible();
	});
});
