/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { anArticle } from '~/server/cms/domain/article.fixture';

const article = anArticle();

describe('ConsulterArticle', () => {
  beforeEach(() => {
    mockUseRouter({});
  });

  it('affiche le titre de l\'article', () => {
    render(<ConsulterArticle article={article} />);
    const titre = screen.getByRole('heading', { level: 1, name: 'Mon article' });
    expect(titre).toBeInTheDocument();
  });

  it('affiche le contenu de l\'article', () => {
    render(<ConsulterArticle article={article} />);
    const contenuTitre = screen.getByRole('heading', { level: 2, name: 'Hic devia socero Latiaeque habe foedabis genetricis' });
    const contenuParagraphe = screen.getByText('Lorem markdownum torumque sic latet');
    expect(contenuTitre).toBeInTheDocument();
    expect(contenuParagraphe).toBeInTheDocument();
  });
});
