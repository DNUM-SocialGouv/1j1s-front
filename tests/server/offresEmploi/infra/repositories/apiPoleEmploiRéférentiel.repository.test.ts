import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { aPoleEmploiHttpClient } from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { createSuccess } from '~/server/errors/either';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { CacheService } from '~/server/services/cache/cache.service';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiPoleEmploiRéférentielRepository', () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let cacheService: CacheService;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    cacheService = new MockedCacheService();
    apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiHttpClientService, cacheService);
  });

  describe('findCodeInseeInRéférentielCommune', () => {
    describe('quand l\'code insee est trouvé', () => {
      it('retourne le code insee', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(createSuccess(anAxiosResponse([
            {
              code: '21489',
              codeDepartement: '21',
              codePostal: '21440',
              libelle: 'POISEUL LA GRANGE',
            },
            {
              code: '55221',
              codeDepartement: '55',
              codePostal: '55000',
              libelle: 'GUERPONT',
            },
            {
              code: '79106',
              codeDepartement: '79',
              codePostal: '79110',
              libelle: 'COUTURE D ARGENSON',
            },
          ])));
        const expected = '55221';

        const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('55000');

        expect(result).toEqual(expected);
      });
    });

    describe('quand l\'code insee n\'est trouvé', () => {
      it('retourne le code postal', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(createSuccess(anAxiosResponse([
            {
              code: '21489',
              codeDepartement: '21',
              codePostal: '21440',
              libelle: 'POISEUL LA GRANGE',
            },
            {
              code: '55221',
              codeDepartement: '55',
              codePostal: '55000',
              libelle: 'GUERPONT',
            },
            {
              code: '79106',
              codeDepartement: '79',
              codePostal: '79110',
              libelle: 'COUTURE D ARGENSON',
            },
          ])));
        const expected = '75101';

        const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('75101');

        expect(result).toEqual(expected);
      });
    });
  });
});
