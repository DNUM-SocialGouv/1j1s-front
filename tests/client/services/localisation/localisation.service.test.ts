/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import {
  aCommuneApiResponse,
  aCommuneListApiResponse,
  aDépartementApiResponse,
  aDépartementListApiResponse,
  aRégionApiResponse,
} from '@tests/fixtures/domain/localisation.fixture';
import { aRésultatsRechercheCommune } from '@tests/fixtures/domain/localisationAvecCoordonnées.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { LocalisationService } from '~/client/services/localisation.service';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import {
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

describe('LocalisationService', () => {
  describe('rechercheLocalisation', () => {
    const list = ['1','3','4','6'];
    list.forEach((value) => {
      it(`quand la recherche contient ${value}, on renvoie null`, async () => {
        const httpClientService = aHttpClientService();
        const localisationService = new LocalisationService(httpClientService);

        const result = await localisationService.rechercherLocalisation(value);

        expect(result).toEqual(null);
      });
    });

    it('quand la recherche contient un caractère spécial sauf accents et espaces, on renvoie null', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);

      const result = await localisationService.rechercherLocalisation('$$');

      expect(result).toEqual(null);
    });

    it('quand la recherche contient qu\'un seul caractère, on renvoie null', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);

      const result = await localisationService.rechercherLocalisation('a');

      expect(result).toEqual(null);
    });

    it('quand on recherche un nombre, on renvoie les départements et les communes', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse({
        communeList: aCommuneListApiResponse(),
        départementList: aDépartementListApiResponse(),
        régionList: [],
      }));

      const result = await localisationService.rechercherLocalisation('34');

      const expected: RechercheLocalisationApiResponse = {
        communeList: [
          {
            code: '34290',
            libelle: 'Abeilhan (34290)',
            nom: 'Abeilhan',
          },
          {
            code: '34230',
            libelle: 'Adissan (34230)',
            nom: 'Adissan',
          },
        ],
        départementList: [
          {
            code: '34',
            libelle: 'Hérault (34)',
            nom: 'Hérault',
          },
        ],
        régionList: [],
      };

      expect(result).toEqual(expected);
      expect(httpClientService.get).toHaveBeenCalledWith('localisations?recherche=34');
    });

    it('quand la recherche contient des lettres, on renvoie les communes, départements et régions correspondantes', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);

      const rechercheLocalisationApiResponse: RechercheLocalisationApiResponse = {
        communeList: [{
          code: '02140',
          libelle: 'Haution (02140)',
          nom: 'Haution',
        }],
        départementList: [{
          code: '68',
          libelle: 'Haut-Rhin (68)',
          nom: 'Haut-Rhin',
        }],
        régionList: [{
          code: '32',
          libelle: 'Haut-de-France (32)',
          nom: 'Haut-de-France',
        }],
      };

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(rechercheLocalisationApiResponse));

      const result = await localisationService.rechercherLocalisation('Haut');

      const expected: RechercheLocalisationApiResponse = {
        communeList: [{
          code: '02140',
          libelle: 'Haution (02140)',
          nom: 'Haution',
        }],
        départementList: [{
          code: '68',
          libelle: 'Haut-Rhin (68)',
          nom: 'Haut-Rhin',
        }],
        régionList: [{
          code: '32',
          libelle: 'Haut-de-France (32)',
          nom: 'Haut-de-France',
        }],
      };

      expect(result).toEqual(expected);
      expect(httpClientService.get).toHaveBeenCalledWith('localisations?recherche=Haut');
    });
  });

  describe('récupérerLocalisationAvecCodeInsee', () => {
    it('renvoie le département', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);
      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aDépartementApiResponse()));

      const result = await localisationService.récupérerLocalisationAvecCodeInsee(TypeLocalisation.DEPARTEMENT,'78');

      const expected: LocalisationApiResponse = {
        code: '34',
        libelle: 'Hérault (34)',
        nom: 'Hérault',
      };

      expect(result).toEqual(expected);
      expect(httpClientService.get).toHaveBeenCalledWith('localisation?typeLocalisation=DEPARTEMENT&codeInsee=78');
    });

    it('renvoie larégion', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);
      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRégionApiResponse()));

      const result = await localisationService.récupérerLocalisationAvecCodeInsee(TypeLocalisation.REGION,'76');

      const expected: LocalisationApiResponse = {
        code: '76',
        libelle: 'Occitanie (76)',
        nom: 'Occitanie',
      };

      expect(result).toEqual(expected);
      expect(httpClientService.get).toHaveBeenCalledWith('localisation?typeLocalisation=REGION&codeInsee=76');
    });

    it('renvoie la commune', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);
      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aCommuneApiResponse()));

      const result = await localisationService.récupérerLocalisationAvecCodeInsee(TypeLocalisation.COMMUNE,'36048');

      const expected: LocalisationApiResponse = {
        code: '34290',
        libelle: 'Abeilhan (34290)',
        nom: 'Abeilhan',
      };

      expect(result).toEqual(expected);
      expect(httpClientService.get).toHaveBeenCalledWith('localisation?typeLocalisation=COMMUNE&codeInsee=36048');
    });
  });

  describe('rechercherCommune', () => {
    it('appelle communes avec la recherche', async () => {
      const httpClientService = aHttpClientService();
      const localisationService = new LocalisationService(httpClientService);
      const query='pari';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheCommune()));

      const result = await localisationService.rechercherCommune(query);

      expect(result).toEqual({
        instance: 'success',
        result: {
          résultats: [
            {
              code: '75056',
              coordonnées: {
                latitude: 48.859,
                longitude: 2.347,
              },
              libelle: 'Paris',
              ville: 'Paris',
            },
            {
              code: '75115',
              coordonnées: {
                latitude: 48.863367,
                longitude: 2.397152,
              },
              libelle: 'Paris 15e Arrondissement',
              ville: 'Paris 15e Arrondissement',
            },
          ],
        },
      });
      expect(httpClientService.get).toHaveBeenCalledWith('communes?q=pari');
    });
  });
});
