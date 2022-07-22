import {
  aRésultatsRéférentielCommunesResponseList,
} from '@tests/fixtures/server/offresEmploi/apiPoleEmploiRéférentiel.repository.fixture';
import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
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
          .mockResolvedValue(createSuccess({
            data: aRésultatsRéférentielCommunesResponseList(),
            status: 200,
          }));
        const expected = '55221';

        const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('55000');

        expect(result).toEqual(expected);
      });
    });

    describe('quand l\'code insee n\'est trouvé', () => {
      it('retourne le code postal', async () => {
        jest
          .spyOn(poleEmploiHttpClientService, 'get')
          .mockResolvedValue(createSuccess({
            data: aRésultatsRéférentielCommunesResponseList(),
            status: 200,
          }));
        const expected = '75101';

        const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('75101');

        expect(result).toEqual(expected);
      });
    });
  });
});
