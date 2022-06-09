/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { anArticle } from '@tests/fixtures/domain/article.fixture';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';

const article = anArticle();

describe('ConsulterArticle', () => {
  it('affiche le titre de l\'article', () => {
    render(<ConsulterArticle article={article} />);
    const titre = screen.getByText('Mon article');
    expect(titre).toBeInTheDocument();
  });
  it('affiche le contenu de l\'article', () => {
    render(<ConsulterArticle article={article} />);
    const contenu1 = screen.getByText('Hic devia socero Latiaeque habe foedabis genetricis');
    const contenu2 = screen.getByText('Lorem markdownum torumque sic latet');
    expect(contenu1).toBeInTheDocument();
    expect(contenu2).toBeInTheDocument();
  });
});
