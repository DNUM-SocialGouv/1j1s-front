import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherÉtablissementAccompagnementHandler } from '~/pages/api/etablissements-accompagnement/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	anOrderedÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import { anAxiosError, anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

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
					expect(json).toEqual(anOrderedÉtablissementAccompagnementList());
				},
				url: '/etablissements-accompagnement?codeCommune=46100&typeAccompagnement=cij',
			});
		});
	});
	describe('lorsque la recherche echoue', () => {
		it('retourne une erreur Demande Incorrecte', async () => {
			nock('https://etablissements-publics.api.gouv.fr/v3')
				.get('/communes/46100/cij')
				.reply(404, anAxiosError({ response: anAxiosResponse({}, 404) }));

			await testApiHandler<ÉtablissementAccompagnement[] | ErrorHttpResponse>({
				handler: (req, res) => rechercherÉtablissementAccompagnementHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual({ error: ErreurMétier.CONTENU_INDISPONIBLE });
				},
				url: '/etablissements-accompagnement?codeCommune=46100&typeAccompagnement=cij',
			});
		});
	});
});
