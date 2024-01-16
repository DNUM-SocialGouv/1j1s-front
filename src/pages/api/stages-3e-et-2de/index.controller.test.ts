import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherStage3eEt2deHandler } from '~/pages/api/stages-3e-et-2de/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';
import { aResultatRechercheStage3eEt2de, aStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de.fixture';
import {
	ApiImmersionFacileStage3eEt2deRechercheResponse,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de';
import {
	anApiImmersionFacileStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.fixture';

describe('rechercher stage 3e et 2de', () => {
	it('retourne une liste de stage 3e et 2de', async () => {
		const searchResult: Array<ApiImmersionFacileStage3eEt2deRechercheResponse> = [
			anApiImmersionFacileStage3eEt2de(),
			anApiImmersionFacileStage3eEt2de(),
		];

		const expected: ResultatRechercheStage3eEt2de = aResultatRechercheStage3eEt2de({
			nombreDeResultats: 2,
			resultats: [
				aStage3eEt2de({
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
				aStage3eEt2de({
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

		await testApiHandler<ResultatRechercheStage3eEt2de | ErrorHttpResponse>({
			pagesHandler: (req, res) => rechercherStage3eEt2deHandler(req, res),
			params: {
				codeMetier: 'codeMetier',
			},
			test: async ({ fetch }) => {
				const resultatsStages3eEt2de = await fetch({ method: 'GET' });
				const jsonResultatsStages3eEt2de = await resultatsStages3eEt2de.json();
				expect(jsonResultatsStages3eEt2de).toEqual(expected);
			},
			url: '/stages-3e-et-2de?codeMetier=codeMetier&distanceCommune=10&latitudeCommune=48.8535&longitudeCommune=2.34839',
		});
	});
});
