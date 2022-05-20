import { aRésultatRéférentielDomaine } from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  aPoleEmploiHttpClient,
  aRéférentielDomainesResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';

import { ApiPoleEmploiRéférentielRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

describe('ApiPoleEmploiRéférentielRepository', () => {
  let poleEmploiHttpClientService: PoleEmploiHttpClientService;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    poleEmploiHttpClientService = aPoleEmploiHttpClient();
    apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiHttpClientService);
  });

  describe('getRéférentielDomaines', () => {
    it('récupère la liste des domaines', async () => {
      jest.spyOn(poleEmploiHttpClientService, 'get').mockResolvedValue(aRéférentielDomainesResponse());

      const { result } = await apiPoleEmploiRéférentielRepository.getRéférentielDomaines();
      expect(result).toEqual(aRésultatRéférentielDomaine());
      expect(poleEmploiHttpClientService.get).toHaveBeenCalledWith('partenaire/offresdemploi/v2/referentiel/domaines');
    });
  });
});
