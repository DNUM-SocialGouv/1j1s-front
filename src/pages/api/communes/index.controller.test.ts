
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherCommuneHandler } from '~/pages/api/communes/index.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { aRechercheAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresseHttpClientService.fixture';

describe('rechercherCommuneHandler', () => {
	describe('quand l‘api répond avec une 200', () => {
		it('retourne la liste des communes en fonction du paramètre de recherche', async() => {
			nock('https://api-adresse.data.gouv.fr/')
				.get('/search/?type=municipality&q=paris&limit=21')
				.reply(200, aRechercheAdresseResponse().data);

			const expected: RésultatsRechercheCommune = {
				résultats: [
					{
						code: '93005',
						codePostal: '93600',
						coordonnées: {
							latitude: 48.926541,
							longitude: 2.493832,
						},
						libelle: '20 Avenue Jules Jouy Aulnay-sous-Bois (93600)',
						ville: 'Aulnay-sous-Bois',
					},
					{
						code: '28201',
						codePostal: '28300',
						coordonnées: {
							latitude: 48.510887,
							longitude: 1.553914,
						},
						libelle: '20 Avenue de la Gare Jouy (28300)',
						ville: 'Jouy',
					},
				],
			};

			await testApiHandler<RésultatsRechercheCommune | ErrorHttpResponse>({
				handler: (req, res) => rechercherCommuneHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					const json = await res.json();
					expect(json).toEqual(expected);
				},
				url: '/communes?q=paris',
			});
		});
	});
});



