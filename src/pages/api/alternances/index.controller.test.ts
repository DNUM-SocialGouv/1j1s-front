import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherAlternanceHandler } from '~/pages/api/alternances/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import {
	aLaBonneAlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';

describe('rechercher alternance', () => {
	it("retourne une liste d'alternance", async () => {
		const codeRomes = 'D123,D122';
		const caller = '1jeune1solution';
		const sources = 'matcha,offres,lba';
		const radius = '30';
		const codeCommune = '13180';
		const longitudeCommune = '15.845';
		const latitudeCommune = '2.37';

		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/').get(
			`/v1/jobs?caller=${caller}&romes=${codeRomes}&sources=${sources}&insee=${codeCommune}&longitude=${longitudeCommune}&latitude=${latitudeCommune}&radius=${radius}`,
		).reply(200, aLaBonneAlternanceApiJobsResponse());

		await testApiHandler<RésultatRechercheAlternance | ErrorHttpResponse>({
			handler: (req, res) => rechercherAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(
					{
						entrepriseList: [{
							adresse: '18 RUE EMILE LANDRIN, 75020 Paris',
							candidaturePossible: true,
							id: '52352551700026',
							nom: 'CLUB VET',
							secteurs: ['Autres intermédiaires du commerce en produits divers', 'Développement informatique'],
							tags: ['Paris', '0 à 9 salariés', 'Candidature spontanée'],
							ville: 'Paris',
						}],
						offreList: [{
							entreprise: { nom: 'une entreprise' },
							id: 'id',
							source: 0,
							tags: ['paris', 'Apprentissage', 'CDI', 'débutant'],
							titre: 'un titre',
						},
						{
							entreprise: { nom: 'SARL HUGUE-DEBRIX' },
							id: 'id-boucher',
							source: 0,
							tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
							titre: 'Boucher-charcutier / Bouchère-charcutière',
						},
						{
							entreprise: { nom: 'MONSIEUR MICHEL' },
							id: 'id-boulanger',
							source: 0,
							tags: ['Apprentissage', 'CDD', 'Cap, autres formations niveau (Infrabac)'],
							titre: 'Ouvrier boulanger / Ouvrière boulangère',
						},
						{
							entreprise: { nom: 'une entreprise' },
							id: 'alternance-pejob',
							source: 1,
							tags: ['paris', 'Contrat d‘alternance', 'CDD'],
							titre: 'un titre',
						}],
					},
				);
			},
			url: `/alternances?codeRomes=${codeRomes}&codeCommune=${codeCommune}&longitudeCommune=${longitudeCommune}&latitudeCommune=${latitudeCommune}&distanceCommune=${radius}`,
		});
	});
});
