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

    it('retourne la liste des communes par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('jou');

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: '36048',
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: '92022',
          libelle: 'Chaville',
        },
      ]);
    });

    it('retourne la liste des départements par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNom('jou');

      expect(result).toEqual([
        {
          code: '78',
          codeInsee: '78',
          libelle: 'Yvelines',
        },
      ]);
    });

    it('retourne la liste des régions par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheRégionResponse());

      const result = await apiGeoLocalisationRepository.getRégionListByNom('jou');

      expect(result).toEqual([
        {
          code: '32',
          codeInsee: '32',
          libelle: 'Hauts-de-France',
        },
      ]);
    });

    it('retourne la liste des communes par code postal trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('92370');

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: '36048',
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: '92022',
          libelle: 'Chaville',
        },
      ]);
    });

    it('retourne la liste des communes du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: '36048',
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: '92022',
          libelle: 'Chaville',
        },
      ]);
    });

    it('retourne la liste du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

      expect(result).toEqual([
        {
          code: '78',
          codeInsee: '78',
          libelle: 'Yvelines',
        },
      ]);
    });
  });
});
