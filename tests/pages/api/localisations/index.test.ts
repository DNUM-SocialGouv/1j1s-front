import { aLongList } from '@tests/fixtures/domain/localisation.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { mapApiResponse, rechercherLocalisationHandler } from '~/pages/api/localisations';
import { RechercheLocalisationApiResponse } from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

describe('rechercher une localisation', () => {
  it('retourne la liste des localisations recherchées', async () => {
    nock('https://geo.api.gouv.fr/')
      .get('/communes?nom=haut')
      .reply(200, [
        {
          _score: 0.27028179470661845,
          code: '02377',
          codeDepartement: '02',
          codeRegion: '32',
          codesPostaux: [
            '02140',
          ],
          nom: 'Haution',
          population: 135,
        },
      ]);
    nock('https://geo.api.gouv.fr/')
      .get('/departements?nom=haut')
      .reply(200, [
        {
          _score: 0.44991452174209456,
          code: '68',
          codeRegion: '44',
          nom: 'Haut-Rhin',
        },
      ]);
    nock('https://geo.api.gouv.fr/')
      .get('/regions?nom=haut')
      .reply(200, [{
        _score: 0.6917635957182404,
        code: '32',
        nom: 'Hauts-de-France',
      }]);

    await testApiHandler<RechercheLocalisationApiResponse>({
      handler: (req, res) => rechercherLocalisationHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
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
            libelle: 'Hauts-de-France (32)',
            nom: 'Hauts-de-France',
          }],
        });
      },
      url: '/localisations?recherche=haut',
    });
  });

  it('la réponse de la recherche contient 20 éléments maximum', () => {
    const { communeList, départementList, régionList } = mapApiResponse(aLongList());

    expect(communeList.length).toEqual(20);
    expect(départementList.length).toEqual(20);
    expect(régionList.length).toEqual(20);
  });
});
