import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherOffreEmploiHandler } from '~/pages/api/emplois/index.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import {
	aRésultatRechercheOffreEmploiAxiosResponse, aRésultatRéférentielCommuneResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiHttpClientService.fixture';

describe('rechercher une offre d‘emploi', () => {
	describe('Quand l‘utilisateur envoie trop de requêtes', () => {
		it('retourne une erreur TOO_MANY_REQUESTS', async () => {
			for (let i = 0; i < Number(process.env.RATE_LIMIT_REQUESTS_NUMBER); i++) {
				nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres')
					.get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
					.reply(401)
					.get('/search?range=0-14&motsCles=boulanger&typeContrat=CDD%2CCDI&commune=75101')
					.reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

				nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel')
					.get('/communes')
					.reply(200, aRésultatRéférentielCommuneResponse().data);

				nock('https://entreprise.pole-emploi.fr')
					.post('/connexion/oauth2/access_token?realm=partenaire')
					.reply(200, { access_token: 'fake_access_token' });

				await testApiHandler<RésultatsRechercheOffre | ErrorHttpResponse>({
					handler: (req, res) => rechercherOffreEmploiHandler(req, res),
					test: async ({ fetch }) => {
						const res = await fetch({ method: 'GET' });
						const json = await res.json();
						expect(json).toEqual(aRésultatsRechercheOffre());
					},
					url: '/emplois?motCle=boulanger&typeDeContrats=CDD,CDI&codeLocalisation=75101&typeLocalisation=COMMUNE&page=1',
				});
			}
			await testApiHandler<RésultatsRechercheOffre | ErrorHttpResponse>({
				handler: (req, res) => rechercherOffreEmploiHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'GET' });
					expect(res.status).toEqual(429);
					const json = await res.json() as ErrorHttpResponse;
					expect(json.error).toEqual('TOO_MANY_REQUESTS');
				},
				url: 'emplois?motCle=boulanger&libelleLocalisation=Paris%20(75)&typeLocalisation=DEPARTEMENT&codeLocalisation=75&page=1',
			});
		});
	});
});
