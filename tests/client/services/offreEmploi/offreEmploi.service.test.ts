/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheOffre } from '@tests/fixtures/domain/offre.fixture';

import { OffreService } from '~/client/services/offre/offreService';
import { createSuccess } from '~/server/errors/either';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreService = new OffreService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

      const result = await offreService.rechercherOffreEmploi(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?motCle=barman&typeDeContrats=CDD%2CCDI&page=1');
    });
  });

  describe('rechercherJobÉtudiant', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreService = new OffreService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

      const result = await offreService.rechercherJobÉtudiant(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
      expect(httpClientService.get).toHaveBeenCalledWith('jobs-etudiants?motCle=barman&page=1');
    });
  });
});
