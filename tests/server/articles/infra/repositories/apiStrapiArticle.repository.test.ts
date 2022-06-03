import { anArticle, anArticleAxiosResponse } from '@tests/fixtures/domain/article.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { ApiStrapiArticleRepository } from '~/server/articles/infra/repositories/apiStrapiArticle.repository';

describe('ApiStrapiArticleRepository', () => {
  describe('getArticle', () => {
    it('récupère l\'article selon le slug', async () => {
      const strapiHttpClientService = aStrapiHttpClientService();
      const apiStrapiArticleRepository = new ApiStrapiArticleRepository(strapiHttpClientService);
      jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(anArticleAxiosResponse());
      const expected = anArticle();
      const slug = expected.slug;
  
      const result = await apiStrapiArticleRepository.getArticle(slug);
  
      expect(result).toEqual(expected);
      expect(strapiHttpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}`);
    });
  });
});
