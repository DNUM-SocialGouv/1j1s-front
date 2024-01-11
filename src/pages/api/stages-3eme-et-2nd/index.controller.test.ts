import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherStage3emeEt2ndHandler } from '~/pages/api/stages-3eme-et-2nd/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';
import { aResultatRechercheStage3emeEt2nd, aStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.fixture';
import {
	ApiImmersionFacileStage3emeEt2ndRechercheResponse,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd';
import {
	anApiImmersionFacileStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.fixture';

describe('rechercher stage 3eme et 2nd', () => {
	it('retourne une liste de stage 3eme et 2nd', async () => {
		const searchResult: Array<ApiImmersionFacileStage3emeEt2ndRechercheResponse> = [
			anApiImmersionFacileStage3emeEt2nd(),
			anApiImmersionFacileStage3emeEt2nd(),
		];

		const expected: ResultatRechercheStage3emeEt2nd = aResultatRechercheStage3emeEt2nd({
			nombreDeResultats: 2,
			resultats: [
				aStage3emeEt2nd({
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
				}),
				aStage3emeEt2nd({
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
				}),
			],
		});

		nock('https://staging.immersion-facile.beta.gouv.fr/api/v2').get(
			'/search?latitude=48.8535&longitude=2.34839&distanceKm=10&voluntaryToImmersion=true&appellationCodes[]=codeMetier',
		).reply(200, searchResult);

		await testApiHandler<ResultatRechercheStage3emeEt2nd | ErrorHttpResponse>({
			handler: (req, res) => rechercherStage3emeEt2ndHandler(req, res),
			params: {
				codeMetier: 'codeMetier',
			},
			test: async ({ fetch }) => {
				const resultatsStages3eme = await fetch({ method: 'GET' });
				const jsonResultatsStages3eme = await resultatsStages3eme.json();
				expect(jsonResultatsStages3eme).toEqual(expected);
			},
			url: '/stages-3eme-et-2nd?codeMetier=codeMetier&distanceCommune=10&latitudeCommune=48.8535&longitudeCommune=2.34839',
		});
	});
});
