import {
  aApiAdresseHttpClientService,
  aRechercheAdresseResponse,
} from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import {
  aApiGeoHttpClientService,
  aRechercheCommuneResponse,
  aRechercheDépartementResponse,
  aRechercheRégionResponse,
} from '@tests/fixtures/services/apiGeoHttpClientService.fixture';

import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

describe('ApiGeoLocalisationRepository', () => {
  describe('getAdresseList', () => {
    let apiGeoLocalisationRepository: ApiGeoLocalisationRepository;

    let apiGeoHttpClientService: ApiGeoHttpClientService;
    let apiAdresseHttpClientService: ApiAdresseHttpClientService;

    beforeEach(() => {
      apiGeoHttpClientService = aApiGeoHttpClientService();
      apiAdresseHttpClientService = aApiAdresseHttpClientService();

      apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
        apiGeoHttpClientService,
        apiAdresseHttpClientService,
      );
    });

    it('retourne la liste des adresses trouvées par l\'api geo gouv', async () => {
      jest.spyOn(apiAdresseHttpClientService, 'get').mockResolvedValue(aRechercheAdresseResponse());

      const result = await apiGeoLocalisationRepository.getAdresseList('jou');

      expect(result).toEqual([
        {
          codeInsee: '93005',
          libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois',
          ville: 'Aulnay-sous-Bois',
        },
        {
          codeInsee: '28201',
          libelle: '20 Avenue de la Gare 28300 Jouy',
          ville: 'Jouy',
        },
      ]);
    });

    it('retourne la liste des communes trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneList('jou');

      expect(result).toEqual([
        {
          codeInsee: '36048',
          libelle: 'Chavin',
        },
        {
          codeInsee: '92022',
          libelle: 'Chaville',
        },
      ]);
    });

    it('retourne la liste des départements trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementList('jou');

      expect(result).toEqual([
        {
          codeInsee: '78',
          libelle: 'Yvelines',
        },
      ]);
    });

    it('retourne la liste des régions trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheRégionResponse());

      const result = await apiGeoLocalisationRepository.getRégionList('jou');

      expect(result).toEqual([
        {
          codeInsee: '32',
          libelle: 'Hauts-de-France',
        },
      ]);
    });
  });
});
