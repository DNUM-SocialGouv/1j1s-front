import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherLocalisationHandler } from '~/pages/api/localisations';
import { LocalisationList } from '~/server/localisations/useCases/rechercherLocalisation.useCase';

describe('rechercher une localisation', () => {
  it('retourne la liste des localisations recherchées', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/communes?nom=haut')
      .reply(200, [
        {
          '_score': 0.27028179470661845,
          'code': '02377',
          'codeDepartement': '02',
          'codeRegion': '32',
          'codesPostaux': [
            '02140',
          ],
          'nom': 'Haution',
          'population': 135,
        },
      ]);
    nock('https://geo.api.gouv.fr/')
      .get('/departements?nom=haut')
      .reply(200, [
        {
          '_score': 0.44991452174209456,
          'code': '68',
          'codeRegion': '44',
          'nom': 'Haut-Rhin',
        },
      ]);
    nock('https://geo.api.gouv.fr/')
      .get('/regions?nom=haut')
      .reply(200, [{
        '_score': 0.6917635957182404,
        'code': '32',
        'nom': 'Hauts-de-France',
      }]);

    await testApiHandler<LocalisationList>({
      handler: (req, res) => rechercherLocalisationHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
          communeList: [{
            code: '02140',
            codeInsee: '02377',
            libelle: 'Haution',
          }],
          départementList: [{
            code: '68',
            codeInsee: '68',
            libelle: 'Haut-Rhin',
          }],
          régionList: [{
            code: '32',
            codeInsee: '32',
            libelle: 'Hauts-de-France',
          }],
        });
      },
      url: '/localisations?recherche=haut',
    });
  });
});
