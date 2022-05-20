/**
 * @jest-environment jsdom
 */
import { InMemoryAppRawDataStorage } from '@tests/client/cache/InMemory.appRawDataStorage';
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import {
  aRésultatRéférentielDomaine,
  aRésultatsRechercheOffreEmploi,
} from '@tests/fixtures/domain/offreEmploi.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

describe('OffreEmploiService', () => {
  let storage: AppRawDataStorage;

  beforeEach(() => {
    storage = new InMemoryAppRawDataStorage();
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rechercherOffreEmploi', () => {
    describe('lorsque le résultat n\'est pas dans le cache', () => {
      it('appelle emploi avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreEmploiService = new OffreEmploiService(httpClientService, storage);
        const offreEmploiQuery = 'page=1&motCle=barman&typeDeContrats=CDD%2CCDI';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

        expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
      });
    });

    describe('lorsque le résultat est présent dans le cache', () => {
      it('appelle emploi avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreEmploiService = new OffreEmploiService(httpClientService, storage);
        const offreEmploiQuery = 'page=1&motCle=barman&typeDeContrats=CDD%2CCDI';

        const apiEmploi = jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);
        const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

        expect(apiEmploi).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ instance: 'success', result: aRésultatsRechercheOffreEmploi() });
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
      });
    });

    describe('lorsque un résultat est présent dans le cache', () => {
      it('appelle emploi avec le nouveau filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreEmploiService = new OffreEmploiService(httpClientService, storage);
        const offreEmploiQuery = 'page=1&motCle=barman&typeDeContrats=CDD%2CCDI';
        const offreEmploiQueryNouveauxFiltres = 'page=1&motCle=barman&typeDeContrats=CDD';

        const apiEmploi = jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);
        await offreEmploiService.rechercherOffreEmploi(offreEmploiQueryNouveauxFiltres);

        expect(apiEmploi).toHaveBeenCalledTimes(2);
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
        expect(httpClientService.get).toHaveBeenLastCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD');
      });
    });
  });

  describe('récupérerRéférentielDomaine', () => {
    it('appel référentiel offre emploi pour les domaines', async () => {
      const httpClientService = aHttpClientService();
      const offreEmploiService = new OffreEmploiService(httpClientService, storage);

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatRéférentielDomaine()));

      const result = await offreEmploiService.récupérerRéférentielDomaine();

      expect(result).toEqual(aRésultatRéférentielDomaine());
      expect(httpClientService.get).toHaveBeenCalledTimes(1);
    });
  });
});
