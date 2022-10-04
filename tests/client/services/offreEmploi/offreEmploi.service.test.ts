/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { createSuccess } from '~/server/errors/either';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('emplois?motCle=barman&typeDeContrats=CDD%2CCDI&page=1');
    });
  });

  describe('rechercherJobÉtudiant', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const offreEmploiQuery = 'motCle=barman&page=1';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.rechercherJobÉtudiant(offreEmploiQuery);

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('jobs-etudiants?motCle=barman&page=1');
    });
  });

  describe('récupérerEchantillonOffreEmploi', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.récupérerEchantillonOffreEmploi();

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('emplois');
    });
  });

  describe('récupérerEchantillonJobÉtudiant', () => {
    it('appelle emploi avec la requête', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService);

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

      const result = await offreEmploiService.récupérerEchantillonJobÉtudiant();

      expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
      expect(httpClientService.get).toHaveBeenCalledWith('jobs-etudiants');
    });
  });
});
