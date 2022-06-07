import { anArticle, anArticleAxiosResponse } from '@tests/fixtures/domain/article.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { consulterArticleHandler } from '~/pages/api/articles/[id]';
import { Article } from '~/server/articles/domain/article';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('Consulter un article', () => {
  describe('Si l\'article existe', () => {
    it('retourne l\'article', async () => {
      nock('http://localhost:1337/api')
        .get('/articles?filters[slug][$eq]=mon-article')
        .reply(200, anArticleAxiosResponse().data);

      await testApiHandler<Article | ErrorHttpResponse>({
        handler: (req, res) => consulterArticleHandler(req, res),
        paramsPatcher: (params) => (params.id = 'mon-article'),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          expect(json).toEqual(anArticle());
        },
      });
    });
  });
  describe('Si l\'article n\'existe pas', () => {
    it('retourne une erreur 404', async () => {
      nock('http://localhost:1337/api')
        .get('/articles?filters[slug][$eq]=mon-article')
        .reply(200, anArticleAxiosResponse({ data: [] }).data);

      await testApiHandler<Article | ErrorHttpResponse>({
        handler: (req, res) => consulterArticleHandler(req, res),
        paramsPatcher: (params) => (params.id = 'mon-article'),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toEqual(404);
        },
      });
    });
  });
});
