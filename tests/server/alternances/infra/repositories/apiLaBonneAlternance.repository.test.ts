import {
  aLaBonneAlternanceHttpClient,
  aRechercheMétierResponse,
} from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

describe('ApiLaBonneAlternanceRepository', () => {
  describe('getMétierRecherchéList', () => {
    let laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient;

    beforeEach(() => {
      laBonneAlternanceHttpClient = aLaBonneAlternanceHttpClient();
    });

    it('retourne la liste des métiers recherchés par l\'api la bonne alternance', async () => {
      const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

      jest.spyOn(laBonneAlternanceHttpClient, 'get').mockResolvedValue(aRechercheMétierResponse());

      const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

      expect([
        {
          intitule: 'Boucherie, charcuterie, traiteur',
          répertoireOpérationnelMétiersEmplois: ['D1103', 'D1101', 'H2101'],
        },
        {
          intitule: 'Boulangerie, pâtisserie, chocolaterie',
          répertoireOpérationnelMétiersEmplois: ['D1102', 'D1104'],
        },
      ]).toEqual(result);
    });
  });
});
