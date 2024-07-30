/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';
import { anArticle } from '~/server/articles/domain/article.fixture';

const article = anArticle({
	contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
		'Lorem markdownum torumque sic latet',
});

describe('ConsulterArticle', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	it('affiche le titre de l‘article', () => {
		render(<DependenciesProvider sessionStorageService={aStorageService()}><ConsulterArticle article={article}/></DependenciesProvider>);
		const titre = screen.getByRole('heading', { level: 1, name: article.titre });
		expect(titre).toBeVisible();
	});

	it('affiche le contenu de l‘article', () => {
		render(<DependenciesProvider sessionStorageService={aStorageService()}><ConsulterArticle article={article}/></DependenciesProvider>);
		const contenuTitre = screen.getByRole('heading', { level: 2, name: 'Hic devia socero Latiaeque habe foedabis genetricis' });
		const contenuParagraphe = screen.getByText('Lorem markdownum torumque sic latet');
		expect(contenuTitre).toBeInTheDocument();
		expect(contenuParagraphe).toBeInTheDocument();
	});
});
