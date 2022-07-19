import { ConfigurationServiceFixture } from '@tests/fixtures/services/configuration.service.fixture';
import {
  aListOfArticleOnPageAccueil,
  aPageAccueilArticleListAxiosResponse,
  aStrapiHttpClientService,
} from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { StrapiCmsService } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { ConfigurationService } from '~/server/services/configuration.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

describe('StrapiCmsService', () => {
  let strapiHttpClientService: StrapiHttpClientService;
  let configurationService: ConfigurationService;
  let strapiCmsService: StrapiCmsService;

  beforeEach(() => {
    strapiHttpClientService = aStrapiHttpClientService();
    configurationService = Object.freeze(new ConfigurationServiceFixture());
    strapiCmsService = new StrapiCmsService(strapiHttpClientService, configurationService);
  });

  describe('getPageAccueilList', () => {
    it('retourne la liste des articles de la page d\'accueil', async () => {
      jest
        .spyOn(strapiHttpClientService, 'get')
        .mockResolvedValue(aPageAccueilArticleListAxiosResponse());
      const expected = aListOfArticleOnPageAccueil();

      const result = await strapiCmsService.getPageAccueilList();

      expect(result).toEqual(expected);
      expect(strapiHttpClientService.get).toHaveBeenCalledWith('http://localhost:1337/api/accueil?populate[articles][populate]=*');
    });
  });
});
