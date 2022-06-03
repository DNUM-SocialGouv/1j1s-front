import {
  aApiAdresseHttpClientService,
  aRechercheAdresseResponse,
} from '@tests/fixtures/services/apiAdresseHttpClientService.fixture';
import {
  aApiGeoHttpClientService, aCommuneResponseAvecPlusieursCodePostaux,
  aRechercheCommuneResponse, aRechercheCommuneResponseAvecPlusieursCodePostaux,
  aRechercheDépartementResponse,
  aRechercheRégionResponse,
} from '@tests/fixtures/services/apiGeoHttpClientService.fixture';

import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

describe('ApiGeoLocalisationRepository', () => {
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

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: CodeInsee.createCodeInsee('36048'),
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: CodeInsee.createCodeInsee('92022'),
          libelle: 'Chaville',
        },
      ]);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

      expect(result).toEqual([
        {
          code: '81310',
          codeInsee: CodeInsee.createCodeInsee('81202'),
          libelle: 'Parisot',
        },
        {
          code: '75001',
          codeInsee: CodeInsee.createCodeInsee('75056_75001'),
          libelle: 'Paris',
        },
      ]);
    });
  });

  describe('getDépartementListByNom', () => {
    it('retourne la liste des départements par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNom('jou');

      expect(result).toEqual([
        {
          code: '78',
          codeInsee: CodeInsee.createCodeInsee('78'),
          libelle: 'Yvelines',
        },
      ]);
    });
  });

  describe('getRégionListByNom', () => {
    it('retourne la liste des régions par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheRégionResponse());

      const result = await apiGeoLocalisationRepository.getRégionListByNom('jou');

      expect(result).toEqual([
        {
          code: '32',
          codeInsee: CodeInsee.createCodeInsee('32'),
          libelle: 'Hauts-de-France',
        },
      ]);
    });
  });

  describe('getCommuneListByCodePostal', () => {
    it('retourne la liste des communes par code postal trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('92370');

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: CodeInsee.createCodeInsee('36048'),
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: CodeInsee.createCodeInsee('92022'),
          libelle: 'Chaville',
        },
      ]);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('75');

      expect(result).toEqual([
        {
          code: '81310',
          codeInsee: CodeInsee.createCodeInsee('81202'),
          libelle: 'Parisot',
        },
        {
          code: '75001',
          codeInsee: CodeInsee.createCodeInsee('75056_75001'),
          libelle: 'Paris',
        },
      ]);
    });
  });

  describe('getCommuneListByNuméroDépartement', () => {
    it('retourne la liste des communes du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponse());

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      expect(result).toEqual([
        {
          code: '36200',
          codeInsee: CodeInsee.createCodeInsee('36048'),
          libelle: 'Chavin',
        },
        {
          code: '92370',
          codeInsee: CodeInsee.createCodeInsee('92022'),
          libelle: 'Chaville',
        },
      ]);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      expect(result).toEqual([
        {
          code: '81310',
          codeInsee: CodeInsee.createCodeInsee('81202'),
          libelle: 'Parisot',
        },
        {
          code: '75001',
          codeInsee: CodeInsee.createCodeInsee('75056_75001'),
          libelle: 'Paris',
        },
      ]);
    });
  });

  describe('getDépartementListByNuméroDépartement', () => {
    it('retourne la liste du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aRechercheDépartementResponse());

      const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

      expect(result).toEqual([
        {
          code: '78',
          codeInsee: CodeInsee.createCodeInsee('78'),
          libelle: 'Yvelines',
        },
      ]);
    });
  });

  describe('getLocalisationByTypeLocalisationAndCodeInsee', () => {
    it('quand le codeInsee contient un underscore on appel le endpoint avec la deuxième valeur dans le codeInsee', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(aCommuneResponseAvecPlusieursCodePostaux());

      const result = await apiGeoLocalisationRepository.getLocalisationByTypeLocalisationAndCodeInsee('communes', CodeInsee.createCodeInsee('75056_75001'));

      expect(result).toEqual({
        code: '75001',
        codeInsee: CodeInsee.createCodeInsee('75056_75001'),
        libelle: 'Paris',
      });
      expect(apiGeoHttpClientService.get).toHaveBeenCalledWith('communes/75056');
    });
  });

});
