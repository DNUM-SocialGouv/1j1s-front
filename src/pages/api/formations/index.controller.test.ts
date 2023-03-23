import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherFormationHandler } from '~/pages/api/formations/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { aRésultatRechercheFormation } from '~/server/formations/domain/formation.fixture';
import {
	aLaBonneAlternanceApiRésultatRechercheFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';

describe('rechercher formation', () => {
	describe('quand le paramètre niveau d’études n’est pas renseignée', () => {
		it('retournes une liste de formations filtrée sans prendre en compte le niveau d’études', async () => {
			const codeRomes = 'F1603,I1308';
			const caller = '1jeune1solution';
			const radius = '30';
			const codeCommune = '13180';
			const longitudeCommune = '15.845';
			const latitudeCommune = '2.37';

			nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
				`/formations?caller=${caller}&romes=${codeRomes}&insee=${codeCommune}&longitude=${longitudeCommune}&latitude=${latitudeCommune}&radius=${radius}`,
			).reply(200, aLaBonneAlternanceApiRésultatRechercheFormationResponse());

			await testApiHandler<Array<RésultatRechercheFormation> | ErrorHttpResponse>({
				handler: (req, res) => rechercherFormationHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual(aRésultatRechercheFormation());
				},
				url: `/formations?codeRomes=${codeRomes}&codeCommune=${codeCommune}&longitudeCommune=${longitudeCommune}&latitudeCommune=${latitudeCommune}&distanceCommune=${radius}`,
			});
		});
	});


	describe('quand le paramètre niveau d’études est renseignée', () => {
		it('retournes une liste de formations filtrée en prenant en compte le niveau d’études', async () => {
			const codeRomes = 'F1603,I1308';
			const caller = '1jeune1solution';
			const radius = '30';
			const codeCommune = '13180';
			const longitudeCommune = '15.845';
			const latitudeCommune = '2.37';
			const niveauEtudes = '6';

			nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
				`/formations?caller=${caller}&romes=${codeRomes}&insee=${codeCommune}&longitude=${longitudeCommune}&latitude=${latitudeCommune}&radius=${radius}&diploma=${niveauEtudes}`,
			).reply(200, aLaBonneAlternanceApiRésultatRechercheFormationResponse());

			await testApiHandler<Array<RésultatRechercheFormation> | ErrorHttpResponse>({
				handler: (req, res) => rechercherFormationHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual(aRésultatRechercheFormation());
				},
				url: `/formations?codeRomes=${codeRomes}&codeCommune=${codeCommune}&longitudeCommune=${longitudeCommune}&latitudeCommune=${latitudeCommune}&distanceCommune=${radius}&niveauEtudes=${niveauEtudes}`,
			});
		});
	});
});
