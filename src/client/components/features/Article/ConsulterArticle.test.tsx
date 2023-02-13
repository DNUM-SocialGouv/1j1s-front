/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { anArticle } from '~/server/cms/domain/article.fixture';

const article = anArticle({
	contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
		'\n' +
		'Lorem markdownum torumque sic latet',
});

describe('ConsulterArticle', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche le titre de l‘article', () => {
		render(<ConsulterArticle article={article} />);
		const titre = screen.getByRole('heading', { level: 1, name: 'Titre' });
		expect(titre).toBeInTheDocument();
	});

	it('affiche le contenu de l‘article', () => {
		render(<ConsulterArticle article={article} />);
		const contenuTitre = screen.getByRole('heading', { level: 2, name: 'Hic devia socero Latiaeque habe foedabis genetricis' });
		const contenuParagraphe = screen.getByText('Lorem markdownum torumque sic latet');
		expect(contenuTitre).toBeInTheDocument();
		expect(contenuParagraphe).toBeInTheDocument();
	});
});
