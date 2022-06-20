import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { récupérerLocalisationAvecCodeInseeHandler } from '~/pages/api/localisation';
import { LocalisationApiResponse } from '~/server/localisations/infra/controllers/LocalisationListApiResponse';

describe('récupérer une localisation', () => {
  it('retourne la localisation pour un département', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/departements/68')
      .reply(200, {
        code: '68',
        codeRegion: '44',
        nom: 'Haut-Rhin',
      });

    await testApiHandler<LocalisationApiResponse>({
      handler: (req, res) => récupérerLocalisationAvecCodeInseeHandler(req, res),
      test: async({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
          code: '68',
          codeInsee: '68',
          libelle: 'Haut-Rhin',
        });
      },
      url: '/localisation?typeLocalisation=DEPARTEMENT&codeInsee=68',
    });
  });

  it('retourne la localisation pour une commune', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/communes/02377')
      .reply(200, {
        code: '02377',
        codeDepartement: '02',
        codeRegion: '32',
        codesPostaux: [
          '02140',
        ],
        nom: 'Haution',
        population: 135,
      });

    await testApiHandler<LocalisationApiResponse>({
      handler: (req, res) => récupérerLocalisationAvecCodeInseeHandler(req, res),
      test: async({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
          code: '02140',
          codeInsee: '02377',
          libelle: 'Haution',
        });
      },
      url: '/localisation?typeLocalisation=COMMUNE&codeInsee=02377',
    });
  });

  it('retourne la localisation pour une région', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/regions/32')
      .reply(200, {
        code: '32',
        nom: 'Hauts-de-France',
      });

    await testApiHandler<LocalisationApiResponse>({
      handler: (req, res) => récupérerLocalisationAvecCodeInseeHandler(req, res),
      test: async({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
          code: '32',
          codeInsee: '32',
          libelle: 'Hauts-de-France',
        });
      },
      url: '/localisation?typeLocalisation=REGION&codeInsee=32',
    });
  });

  it('retourne une erreur 500', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/communes/9999')
      .reply(200, {
        code: null,
        nom: null,
      });

    await testApiHandler<LocalisationApiResponse>({
      handler: (req, res) => récupérerLocalisationAvecCodeInseeHandler(req, res),
      test: async({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        expect(res.status).toEqual(500);
      },
      url: '/localisation?typeLocalisation=COMMUNE&codeInsee=9999',
    });
  });
});
