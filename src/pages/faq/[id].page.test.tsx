import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDateService } from '~/client/services/date/date.service.fixture';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import ConsulterArticlePage from '~/pages/faq/[id].page';
import { FAQQuestionEtReponse } from '~/server/faq/domain/FAQ';
import { aQuestionEtReponse } from '~/server/faq/domain/FAQ.fixture';

describe('<ConsulterArticlePage />', () => {

	beforeEach(() => {
		mockUseRouter({});
	});
	it('doit rendre du HTML respectant la specification', () => {
		const faqRéponse: FAQQuestionEtReponse = aQuestionEtReponse({
			contenu: 'Contenu de la réponse',
			problématique: 'Problématique de la question',
			slug: 'slug-de-la-question',
		});

		const { container } = render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticlePage faqRéponse={faqRéponse} />
			</DependenciesProvider>,
		);

		expect(container.outerHTML).toHTMLValidate();
	});
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const faqRéponse: FAQQuestionEtReponse = aQuestionEtReponse({
			contenu: 'Contenu de la réponse',
			problématique: 'Problématique de la question',
			slug: 'slug-de-la-question',
		});

		const { container } = render(
			<DependenciesProvider
				sessionStorageService={aStorageService()}
				dateService={aDateService()}>
				<ConsulterArticlePage faqRéponse={faqRéponse} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
