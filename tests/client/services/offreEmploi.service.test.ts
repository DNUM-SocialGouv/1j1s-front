/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec le filtre', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const offreEmploiFiltre = {
        motCle: 'barman',
        typeDeContrats: 'CDD,CDI',
      };

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiFiltre);

      expect(result).toEqual(aRésultatsRechercheOffreEmploi());
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
    });
  });
});
