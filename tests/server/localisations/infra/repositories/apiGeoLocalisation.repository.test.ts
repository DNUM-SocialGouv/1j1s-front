import { aApiGeoHttpClientService } from '@tests/fixtures/services/apiGeoHttpClientService.fixture';

import { createSuccess } from '~/server/errors/either';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

describe('ApiGeoLocalisationRepository', () => {
  let apiGeoLocalisationRepository: ApiGeoLocalisationRepository;

  let apiGeoHttpClientService: ApiGeoHttpClientService;

  beforeEach(() => {
    apiGeoHttpClientService = aApiGeoHttpClientService();

    apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(
      apiGeoHttpClientService,
    );
  });

  describe('getCommuneListByNom', () => {
    it('retourne la liste des communes par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('jou');

      const expected = createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]);

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByNom('par');

      const expected = createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });

  describe('getDépartementListByNom', () => {
    it('retourne la liste des départements par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '78',
          nom: 'Yvelines',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getDépartementListByNom('jou');

      const expected = createSuccess([
        {
          code: '78',
          nom: 'Yvelines',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });

  describe('getRégionListByNom', () => {
    it('retourne la liste des régions par nom trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '32',
          nom: 'Hauts-de-France',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getRégionListByNom('jou');

      const expected = createSuccess([
        {
          code: '32',
          nom: 'Hauts-de-France',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });

  describe('getCommuneListByCodePostal', () => {
    it('retourne la liste des communes par code postal trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('92370');

      const expected = createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]);

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByCodePostal('75');

      const expected = createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });

  describe('getCommuneListByNuméroDépartement', () => {
    it('retourne la liste des communes du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      const expected = createSuccess([
        {
          code: '36200',
          nom: 'Chavin',
        },
        {
          code: '92370',
          nom: 'Chaville',
        },
      ]);

      expect(result).toEqual(expected);
    });

    it('quand les communes contiennent plusieurs code postaux retourne le code insee de la commune avec le premier code postal et pas le code insee lui meme', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getCommuneListByNuméroDépartement('92');

      const expected = createSuccess([
        {
          code: '81310',
          nom: 'Parisot',
        },
        {
          code: '75001',
          nom: 'Paris',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });

  describe('getDépartementListByNuméroDépartement', () => {
    it('retourne la liste du département par numéro du département trouvées par l\'api decoupage administratif', async () => {
      jest.spyOn(apiGeoHttpClientService, 'get').mockResolvedValue(createSuccess([
        {
          code: '78',
          nom: 'Yvelines',
        },
      ]));

      const result = await apiGeoLocalisationRepository.getDépartementListByNuméroDépartement('78');

      const expected = createSuccess([
        {
          code: '78',
          nom: 'Yvelines',
        },
      ]);

      expect(result).toEqual(expected);
    });
  });
});
