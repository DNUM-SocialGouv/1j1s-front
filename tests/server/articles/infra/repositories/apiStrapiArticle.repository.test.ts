import { anArticle } from '@tests/fixtures/domain/article.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Article } from '~/server/articles/domain/article';
import { mapArticle } from '~/server/articles/infra/repositories/apiStrapiArticle.mapper';
import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';
import { createSuccess, Success } from '~/server/errors/either';
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
        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(createSuccess(anArticle()));
        const expectedArticle = anArticle();
        const slug = expectedArticle.slug;

        const result = await apiStrapiArticleRepository.getArticle(slug) as Success<Article>;

        expect(result.result).toEqual(expectedArticle);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate[0]=banniere`, mapArticle);
      });
    });
  });
});
