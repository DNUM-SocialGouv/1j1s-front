/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aMétierRecherchéList } from '@tests/fixtures/domain/alternance.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';

describe('MétierRecherchéService', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rechercheMétier', () => {
    it('retourne la liste des codes ROME associé à un métier', async () => {
      const httpClientService = aHttpClientService();
      const offreAlternanceService = new MétierRecherchéService(httpClientService);
      const offreEmploiQuery = 'bou';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aMétierRecherchéList()));

      const result = await offreAlternanceService.rechercherMétier(offreEmploiQuery);

      expect(result).toEqual([
        {
          codeROMEList: ['D1103', 'D1101', 'H2101'],
          intitulé: 'Boucherie, charcuterie, traiteur',
        },
        {
          codeROMEList: ['D1102', 'D1104'],
          intitulé: 'Boulangerie, pâtisserie, chocolaterie',
        },
      ]);
      expect(httpClientService.get).toHaveBeenCalledWith('metiers/search?intitule=bou');
    });
  });
});
