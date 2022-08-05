import { anArticle, anArticleResponse } from '@tests/fixtures/domain/article.fixture';
import { aMesuresJeunes, aMesuresJeunesResponse } from '@tests/fixtures/domain/mesuresJeunes.fixture';

import { mapArticle, mapMesuresJeunes } from '~/server/cms/infra/repositories/strapi.mapper';

describe('strapi mapper', () => {
  describe('mapArticle', () => {
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
              slug: 'mon-article-1',
              titre: 'Mon article 1',
            },
          },
          {
            attributes: {
              contenu: 'Contenu',
              slug: 'mon-article-2',
              titre: 'Mon article 2',
            },
          }],
        });
        const expectedArticle = anArticle({ contenu: '<p>Contenu</p>\n', slug: 'mon-article-1', titre: 'Mon article 1' });
        const article = mapArticle(articleResponse);
        expect(article).toEqual(expectedArticle);
      });
    });
  });

  describe('mapMesuresJeunes', () => {
    describe('lorsque la liste contient les mesures jeunes', () => {
      it('retourne les mesures jeunes', () => {
        const mesuresJeunesResponse = aMesuresJeunesResponse();
        const expectedMesuresJeunes = aMesuresJeunes();
        const mesuresJeunes = mapMesuresJeunes(mesuresJeunesResponse);
        expect(mesuresJeunes).toEqual(expectedMesuresJeunes);
      });
    });
  });
});
