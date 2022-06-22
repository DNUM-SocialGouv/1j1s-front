import { MockedCacheService } from '@tests/fixtures/services/cacheService.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import {
  aPoleEmploiHttpClient,
  aRésultatRéférentielCommuneResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

describe('ApiPoleEmploiRéférentielRepository', () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiHttpClientService, new MockedCacheService());
  });

  describe('findCodeInseeInRéférentiel', () => {
    it('récupère le code insee dans le référentiel commune de pole emploi', async () => {
      jest
        .spyOn(poleEmploiHttpClientService, 'get')
        .mockResolvedValue(aRésultatRéférentielCommuneResponse());
      const expected = '44109';

      const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('44000');

      expect(result).toEqual(expected);
      expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
        'partenaire/offresdemploi/v2/referentiel/communes',
      );
    });
  });

  it('récupère le code insee dans le référentiel commune de pole emploi dans le cache', async () => {
    jest
      .spyOn(poleEmploiHttpClientService, 'get')
      .mockResolvedValue(anAxiosResponse([
        {
          code: '76322',
          codeDepartement: '76',
          codePostal: '76120',
          libelle: 'LE GRAND QUEVILLY',
        },
        {
          code: '44109',
          codeDepartement: '44',
          codePostal: '44000',
          libelle: 'NANTES',
        },
        {
          code: '76615',
          codeDepartement: '76',
          codePostal: '76133',
          libelle: 'ST MARTIN DU BEC',
        },
      ]));
    const expected = '44109';

    await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('44000');
    const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('44000');

    expect(result).toEqual(expected);
    expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith(
      'partenaire/offresdemploi/v2/referentiel/communes',
    );
  });
});
