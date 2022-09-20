/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { anArticle } from '@tests/fixtures/domain/article.fixture';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';

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
