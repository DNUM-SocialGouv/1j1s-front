import { anArticle, anArticleAxiosResponse } from '@tests/fixtures/domain/article.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Article } from '~/server/articles/domain/article';
import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';
import { Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

let strapiHttpClientService: StrapiHttpClientService;
let apiStrapiArticleRepository: ApiStrapiArticleRepository;

describe('ApiStrapiArticleRepository', () => {
  describe('getArticle', () => {
    beforeAll(() => {
      strapiHttpClientService = aStrapiHttpClientService();
      apiStrapiArticleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);
    });
    describe('Si un article est trouvé', () => {
      it('récupère l\'article selon le slug', async () => {
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(anArticleAxiosResponse());
        const expectedArticle = anArticle();
        const slug = expectedArticle.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Success<Article>;

        expect(result.result).toEqual(expectedArticle);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate[0]=banniere`);
      });
    });
    describe('Si aucun article n\'est trouvé', () => {
      it('retourne une erreur ressource introuvable', async () => {
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(anArticleAxiosResponse({ data: [] }));
        const article = anArticle();
        const slug = article.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Failure;

        expect(result.errorType).toEqual(ErrorType.RESSOURCE_INTROUVABLE);
      });
    });
    describe('Si l\'api retourne une erreur', () => {
      it('retourne une erreur inattendue', async () => {
        jest.spyOn(strapiHttpClientService, 'get').mockRejectedValue(new Error());
        const article = anArticle();
        const slug = article.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Failure;

        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });
  });
});
