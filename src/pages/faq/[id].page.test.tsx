/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import ConsulterArticlePage from '~/pages/faq/[id].page';
import { Question } from '~/server/cms/domain/FAQ.type';
import { checkA11y } from '~/test-utils';

describe('<ConsulterArticlePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const faqRéponse: Question.QuestionRéponse = {
			contenu: 'Contenu de la réponse',
			problématique: 'Problématique de la question',
			slug: 'slug-de-la-question',
		};

		mockUseRouter({});
		
		const { container } = render(
			<ConsulterArticlePage faqRéponse={faqRéponse} />,
		);

		await checkA11y(container);
	});
});
