import { anArticle, anArticleResponse } from '@tests/fixtures/domain/article.fixture';

import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';

describe('ApiStrapiArticleMapper', () => {
  describe('mapArticle', () => {
    describe('lorsque la liste renvoyée des articles est vide', () => {
      it('retourne un résultat non défini', () => {
        const emptyArticleResponse = anArticleResponse({ data: [] });
        const article = mapArticle(emptyArticleResponse);
        expect(article).toBeUndefined();
      });
    });
    describe('lorsque la liste renvoyée contient 1 article', () => {
      it('retourne l\'article', () => {
        const articleResponse = anArticleResponse();
        const expectedArticle = anArticle();
        const article = mapArticle(articleResponse);
        expect(article).toEqual(expectedArticle);
      });
    });
    describe('lorsque la liste renvoyée contient plusieurs articles', () => {
      it('retourne le premier article de la liste', () => {
        const articleResponse = anArticleResponse({ 
          data: [{
            attributes: {
              contenu: 'Contenu',
              createdAt: '2022-06-02T15:49:22.086Z',
              publishedAt: '2022-06-02T15:49:50.642Z',
              slug: 'mon-article-1',
              titre: 'Mon article 1',
              updatedAt: '2022-06-02T15:49:50.645Z',
            },
            id: '1',
          },
          {
            attributes: {
              contenu: 'Contenu',
              createdAt: '2022-06-02T15:49:22.086Z',
              publishedAt: '2022-06-02T15:49:50.642Z',
              slug: 'mon-article-2',
              titre: 'Mon article 2',
              updatedAt: '2022-06-02T15:49:50.645Z',
            },
            id: '2',
          }],
        });
        const expectedArticle = anArticle({ contenu: '<p>Contenu</p>\n', slug: 'mon-article-1', titre: 'Mon article 1' });
        const article = mapArticle(articleResponse);
        expect(article).toEqual(expectedArticle);
      });
    });
  });
});
