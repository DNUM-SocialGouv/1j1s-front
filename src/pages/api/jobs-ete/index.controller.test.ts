import { NextApiRequest } from 'next';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { jobEteFiltreMapper, jobsEteQuerySchema, rechercherJobEteHandler } from '~/pages/api/jobs-ete/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { MAX_PAGE_ALLOWED_BY_POLE_EMPLOI, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';
import {
	aRésultatRechercheOffreEmploiAxiosResponse,
	aRésultatRéférentielCommuneResponse,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response.fixture';

describe('rechercher un job d’été', () => {
	it('retourne la liste des jobs d’été filtrée', async () => {
		nock('https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres')
			.get('/search?motsCles=boulanger&range=0-14&typeContrat=CDD%2CMIS%2CSAI&commune=75101&dureeContratMax=2')
			.reply(401)
			.get('/search?motsCles=boulanger&range=0-14&typeContrat=CDD%2CMIS%2CSAI&commune=75101&dureeContratMax=2')
			.reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

		nock('https://api.pole-emploi.io/partenaire/offresdemploi/v2/referentiel')
			.get('/communes')
			.reply(200, aRésultatRéférentielCommuneResponse().data);

		nock('https://entreprise.pole-emploi.fr')
			.post('/connexion/oauth2/access_token?realm=partenaire')
			.reply(200, { access_token: 'fake_access_token' });

		await testApiHandler<RésultatsRechercheOffre | ErrorHttpResponse>({
			handler: (req, res) => rechercherJobEteHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aRésultatsRechercheOffre());
			},
			url: '/jobs-ete?motCle=boulanger&codeLocalisation=75101&typeLocalisation=COMMUNE&page=1',
		});
	});
	
	it('map la request parameters en JobEteFiltre', async () => {
		const request: NextApiRequest = {
			query: {
				codeLocalisation: '75101',
				motCle: 'boulanger',
				page: '1',
				typeLocalisation: 'COMMUNE',
			},
		} as unknown as NextApiRequest;
		
		const result = jobEteFiltreMapper(request);

		expect(result).toEqual({
			grandDomaineList: undefined,
			localisation: {
				code: '75101',
				type: 'COMMUNE',
			},
			motClé: 'boulanger',
			page: 1,
		});
	});

	describe('Quand les paramètres de l‘url ne respectent pas le schema de validation du controller', () => {
		it.each([
			{ page: MAX_PAGE_ALLOWED_BY_POLE_EMPLOI + 1 },
			{ page: '0' },
			{ page: 'NaN' },
			{ page: 'nan' },
			{ page: '1', typeLocalisation: 'erreur' },
			{ codeLocalisation: 'erreur', page: '1', typeLocalisation: 'COMMUNE' },
		])('pour %j on retourne une erreur', (queryParametersToTestInError) => {
			const result = jobsEteQuerySchema.validate(queryParametersToTestInError);

			expect(result.error).toBeDefined();
		});
	});
});
