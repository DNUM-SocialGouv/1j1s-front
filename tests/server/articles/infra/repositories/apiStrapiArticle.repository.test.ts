import { anArticle, anArticleAxiosResponse } from '@tests/fixtures/domain/article.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Article } from '~/server/articles/domain/article';
import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';
import { Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

describe('ApiStrapiArticleRepository', () => {
  describe('getArticle', () => {
    describe('Si un article est trouvé', () => {
      it('récupère l\'article selon le slug', async () => {
        const strapiHttpClientService = aStrapiHttpClientService();
        const apiStrapiArticleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(anArticleAxiosResponse());
        const expected = anArticle();
        const slug = expected.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Success<Article>;

        expect(result.result).toEqual(expected);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}`);
      });
    });
    describe('Si aucun article n\'est trouvé', () => {
      it('retourne une erreur ressource introuvable', async () => {
        const strapiHttpClientService = aStrapiHttpClientService();
        const apiStrapiArticleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(anArticleAxiosResponse({ data: [] }));
        const expected = anArticle();
        const slug = expected.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Failure;

        expect(result.errorType).toEqual(ErrorType.RESSOURCE_INTROUVABLE);
      });
    });
  });
});
