import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherÉtablissementAccompagnementHandler } from '~/pages/api/etablissements-accompagnement/index.controller';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {
  anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import {
  aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import { anAxiosError, anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

describe('rechercher un établissement d‘accompagnement', () => {
  describe('lorsque la recherche est valide', () => {
    it('retourne la liste des établissements d‘accompagnement', async () => {
      nock('https://etablissements-publics.api.gouv.fr/v3')
        .get('/communes/46100/cij')
        .reply(200, aRésultatRechercheÉtablissementPublicResponse());

      await testApiHandler<ÉtablissementAccompagnement[] | ErrorHttpResponse>({
        handler: (req, res) => rechercherÉtablissementAccompagnementHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          expect(json).toEqual(anÉtablissementAccompagnementList());
        },
        url: '/etablissements-accompagnement?codeCommune=46100',
      });
    });
  });
  describe('lorsque la recherche echoue', () => {
    it('retourne une erreur Demande Incorrecte', async () => {
      nock('https://etablissements-publics.api.gouv.fr/v3')
        .get('/communes/46100/cij')
        .reply(404, anAxiosError({ response: anAxiosResponse({}, 401) }));

      await testApiHandler<ÉtablissementAccompagnement[] | ErrorHttpResponse>({
        handler: (req, res) => rechercherÉtablissementAccompagnementHandler(req, res),
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          const json = await res.json();
          expect(json).toEqual({ error: ErreurMétier.DEMANDE_INCORRECTE });
        },
        url: '/etablissements-accompagnement?codeCommune=46100',
      });
    });
  });
});
