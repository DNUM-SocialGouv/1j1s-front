/**
 * @jest-environment jsdom
 */
import { InMemoryAppRawDataStorage } from '@tests/client/cache/InMemory.appRawDataStorage';
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
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
        const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
      });
    });

    describe('lorsque le résultat est présent dans le cache', () => {
      it('appelle emploi avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreEmploiService = new OffreEmploiService(httpClientService, storage);
        const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI';

        const apiEmploi = jest.spyOn(httpClientService, 'get').mockResolvedValueOnce(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);
        const result = await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);

        expect(apiEmploi).toHaveBeenCalledTimes(1);
        expect(result).toEqual(aRésultatsRechercheOffreEmploi());
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
      });
    });

    describe('lorsque un résultat est présent dans le cache', () => {
      it('appelle emploi avec le nouveau filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreEmploiService = new OffreEmploiService(httpClientService, storage);
        const offreEmploiQuery = 'motCle=barman&typeDeContrats=CDD%2CCDI';
        const offreEmploiQueryNouveauxFiltres = 'motCle=barman&typeDeContrats=CDD';

        const apiEmploi = jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheOffreEmploi()));

        await offreEmploiService.rechercherOffreEmploi(offreEmploiQuery);
        await offreEmploiService.rechercherOffreEmploi(offreEmploiQueryNouveauxFiltres);

        expect(apiEmploi).toHaveBeenCalledTimes(2);
        expect(httpClientService.get).toHaveBeenCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD%2CCDI');
        expect(httpClientService.get).toHaveBeenLastCalledWith('emplois?page=1&motCle=barman&typeDeContrats=CDD');
      });
    });
  });
});
