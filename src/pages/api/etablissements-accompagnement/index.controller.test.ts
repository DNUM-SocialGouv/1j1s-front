import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	rechercherÉtablissementAccompagnementHandler,
} from '~/pages/api/etablissements-accompagnement/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { EtablissementAccompagnement } from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';
import {
	anEtablissementAccompagnementList,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aResultatRechercheEtablissementPublicListResponse,
} from '~/server/etablissement-accompagnement/infra/apiEtablissementPublic.fixture';
import { anAxiosError, anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

describe('rechercher un établissement d‘accompagnement', () => {
	describe('lorsque la recherche est valide', () => {
		it('retourne la liste des établissements d‘accompagnement', async () => {
			nock('https://api-lannuaire.service-public.fr/api/explore/v2.1')
				.get('/catalog/datasets/api-lannuaire-administration/records?where=suggest(adresse,%22code_postal%2034001%22)and%20pivot%20LIKE%20%22cij%22&limit=100&select=adresse,telephone,adresse_courriel,nom,id,pivot,plage_ouverture')
				.reply(200, aResultatRechercheEtablissementPublicListResponse());

			await testApiHandler<EtablissementAccompagnement[] | ErrorHttpResponse>({
				pagesHandler: (req, res) => rechercherÉtablissementAccompagnementHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual(anEtablissementAccompagnementList());
				},
				url: '/etablissements-accompagnement?codePostal=34001&codeCommune=34000&typeAccompagnement=cij',
			});
		});
	});
	describe('lorsque la recherche echoue', () => {
		it('retourne une erreur Demande Incorrecte', async () => {
			nock('https://api-lannuaire.service-public.fr/api/explore/v2.1')
				.get('/catalog/datasets/api-lannuaire-administration/records?where=suggest(adresse,%22code_postal%2034001%22)and%20pivot%20LIKE%20%22cij%22&limit=100&select=adresse,telephone,adresse_courriel,nom,id,pivot,plage_ouverture')
				.reply(404, anAxiosError({ response: anAxiosResponse({}, 404) }));

			await testApiHandler<EtablissementAccompagnement[] | ErrorHttpResponse>({
				pagesHandler: (req, res) => rechercherÉtablissementAccompagnementHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual({ error: ErreurMetier.CONTENU_INDISPONIBLE });
				},
				url: '/etablissements-accompagnement?codePostal=34001&codeCommune=34000&typeAccompagnement=cij',
			});
		});
	});
});
