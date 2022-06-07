/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import {
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec le filtre', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const offreEmploiQuery = 'page=1&motCle=barman&typeDeContrats=CDD%2CCDI';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
    });

    it('appelle emploi avec le filtre par défaut', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const offreEmploiQuery = 'page=1&motCle=barman&typeDeContrats=CDD%2CCDI';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery, 'natureContrat=E1');

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI&natureContrat=E1');
    });

  });

});
