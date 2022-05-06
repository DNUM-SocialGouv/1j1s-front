/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi.service';


describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec le filtre', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const formData = new FormData();
      formData.append('motCle', 'barman');
      formData.append('typeDeContrats', 'CDD,CDI');

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherOffreEmploi(formData);

      expect(result).toEqual(aRésultatsRechercheOffreEmploi());
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
    });
  });
});
