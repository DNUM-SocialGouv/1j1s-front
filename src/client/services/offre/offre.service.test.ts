/**
 * @jest-environment jsdom
 */
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { OffreService } from '~/client/services/offre/offre.service';
import { createSuccess } from '~/server/errors/either';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

describe('OffreService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = anHttpClientService();
      const offreService = new OffreService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

      const result = await offreService.rechercherOffreEmploi(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
      expect(httpClientService.get).toHaveBeenCalledWith('jobs?motCle=barman&typeDeContrats=CDD%2CCDI&page=1');
    });
  });

  describe('rechercherJobÉtudiant', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = anHttpClientService();
      const offreService = new OffreService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffre()));

      const result = await offreService.rechercherJobÉtudiant(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffre() });
      expect(httpClientService.get).toHaveBeenCalledWith('jobs-etudiants?motCle=barman&page=1');
    });
  });
});
