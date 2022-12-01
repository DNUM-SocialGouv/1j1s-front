import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { mapApiResponse, rechercherLocalisationHandler } from '~/pages/api/localisations/index.controller';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { aLongList } from '~/server/localisations/domain/localisation.fixture';
import {
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { aRechercheAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresseHttpClientService.fixture';

describe('rechercher une localisation', () => {
  describe('quand la réponse est en succès' , () => {
    it('retourne la liste des localisations recherchées', async () => {
      nock('https://api-adresse.data.gouv.fr')
        .get('/search/?q=haut&type=municipality&limit=21')
        .reply(200, aRechercheAdresseResponse().data);
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

      await testApiHandler<RechercheLocalisationApiResponse | ErrorHttpResponse>({
        handler: (req, res) => rechercherLocalisationHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          const expectedJSON: RechercheLocalisationApiResponse = {
            communeList: [
              {
                code: '28201',
                codePostal: '28300',
                libelle: '20 Avenue de la Gare Jouy (28300)',
                nom: 'Jouy',
              },
              {
                code: '93005',
                codePostal: '93600',
                libelle: '20 Avenue Jules Jouy Aulnay-sous-Bois (93600)',
                nom: 'Aulnay-sous-Bois',
              },
            ],
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
          };
          expect(json).toEqual(expectedJSON);
        },
        url: '/localisations?recherche=haut',
      });
    });

    it('la réponse de la recherche contient 20 éléments maximum', () => {
      const { communeList, départementList, régionList } = mapApiResponse(aLongList());

      expect(communeList.length).toEqual(21);
      expect(départementList.length).toEqual(20);
      expect(régionList.length).toEqual(20);
    });
  });

  describe('quand la réponse est en échec', () => {
    it('retourne un message d\'erreur', async () => {
      await testApiHandler<RechercheLocalisationApiResponse | ErrorHttpResponse>({
        handler: (req, res) => rechercherLocalisationHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          const expectedJSON: ErrorHttpResponse = {
            error: ErreurMétier.DEMANDE_INCORRECTE,
          };
          expect(json).toEqual(expectedJSON);
        },
        url: '/localisations?recherche=Pa',
      });
    });
  });
});
