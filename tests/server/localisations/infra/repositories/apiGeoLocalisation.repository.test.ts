import {
  aApiAdresseHttpClientService,
  aRechercheAdresseResponse,
} from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import {
  aApiGeoHttpClientService,
  aRechercheCommuneResponse,
  aRechercheCommuneResponseAvecPlusieursCodePostaux,
  aRechercheDépartementResponse,
  aRechercheRégionResponse,
} from '@tests/fixtures/services/apiGeoHttpClientService.fixture';

import { Localisation } from '~/server/localisations/domain/localisation';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

describe('ApiGeoLocalisationRepository', () => {
  let apiGeoLocalisationRepository: ApiGeoLocalisationRepository;

  let apiGeoHttpClientService: ApiGeoHttpClientService;
  let apiAdresseHttpClientService: ApiAdresseHttpClientService;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    apiGeoHttpClientService = aApiGeoHttpClientService();
    apiAdresseHttpClientService = aApiAdresseHttpClientService();

    apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
      apiGeoHttpClientService,
      apiAdresseHttpClientService,
      apiPoleEmploiRéférentielRepository,
    );
  });
  
  describe('getAdresseList', () => {
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
  });

  describe('getCommuneListByNom', () => {
    it('retourne la liste des communes par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('jou');

      const expected: Localisation[] = [
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

      const expected: Localisation[] = [
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getDépartementListByNom', () => {
    it('retourne la liste des départements par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNom('jou');

      const expected: Localisation[] = [
        {
          code: '78',
          nom: 'Yvelines',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getRégionListByNom', () => {
    it('retourne la liste des régions par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheRégionResponse());

      const result = await apiGeoLocalisationRepository.getRégionListByNom('jou');

      const expected: Localisation[] = [
        {
          code: '32',
          nom: 'Hauts-de-France',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getCommuneListByCodePostal', () => {
    it('retourne la liste des communes par code postal trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('92370');

      const expected: Localisation[] = [
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('75');

      const expected: Localisation[] = [
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getCommuneListByNuméroDépartement', () => {
    it('retourne la liste des communes du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      const expected: Localisation[] = [
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      const expected: Localisation[] = [
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getDépartementListByNuméroDépartement', () => {
    it('retourne la liste du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

      const expected: Localisation[] = [
        {
          code: '78',
          nom: 'Yvelines',
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
