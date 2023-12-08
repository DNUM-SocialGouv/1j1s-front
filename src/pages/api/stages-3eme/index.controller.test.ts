import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherStage3emeHandler } from '~/pages/api/stages-3eme/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';
import { aResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme.fixture';
import {
	ApiImmersionFacileStage3emeRechercheResponse,
} from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme';
import {
	anApiImmersionFacileStage3eme,
} from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.fixture';

describe('rechercher stage 3eme', () => {
	it('retourne une liste de stage 3eme', async () => {
		const searchResult: Array<ApiImmersionFacileStage3emeRechercheResponse> = [
			anApiImmersionFacileStage3eme(),
			anApiImmersionFacileStage3eme(),
		];

		const expected: ResultatRechercheStage3eme = aResultatRechercheStage3eme({
			nombreDeResultats: 2,
			resultats: [
				{
					adresse: {
						codeDepartement: '75',
						codePostal: '75001',
						rueEtNumero: '1 Rue de la Lune',
						ville: 'Paris',
					},
					domaine: 'Boulangerie',
					modeDeContact: 'Candidature en personne',
					nomEntreprise: 'La Boulangerie',
					nombreDeSalaries: '1-9',
				},
				{
					adresse: {
						codeDepartement: '75',
						codePostal: '75001',
						rueEtNumero: '1 Rue de la Lune',
						ville: 'Paris',
					},
					domaine: 'Boulangerie',
					modeDeContact: 'Candidature en personne',
					nomEntreprise: 'La Boulangerie',
					nombreDeSalaries: '1-9',
				},
			],
		});

		nock('https://staging.immersion-facile.beta.gouv.fr/api/v2').get(
			'/search?latitude=48.8535&longitude=2.34839&distanceKm=10&appellationCodes[]=codeMetier',
		).reply(200, searchResult);

		await testApiHandler<ResultatRechercheStage3eme | ErrorHttpResponse>({
			handler: (req, res) => rechercherStage3emeHandler(req, res),
			params: {
				codeMetier: 'codeMetier',
			},
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(expected);
			},
			url: '/stages-3eme',
		});
	});
});
