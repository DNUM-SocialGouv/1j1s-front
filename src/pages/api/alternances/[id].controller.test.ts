import { configureScope } from '@sentry/nextjs';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Alternance } from '~/server/alternances/domain/alternance';
import { anAlternanceMatcha } from '~/server/alternances/domain/alternance.fixture';
import { aListeLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';

import getAlternanceHandler from './[id].controller';

jest.mock('@sentry/nextjs', () => {
	const sentry = jest.requireActual('@sentry/nextjs');

	return ({
		...sentry,
		configureScope: jest.fn(),
	});
});

describe('rechercher alternance', () => {
	beforeEach(() => {
		(configureScope as jest.Mock).mockClear();
	});
	it('retourne une alternance', async () => {
		const alternanceId = 'g8_DWUYBnYooOG9KzQM_y-0';
		const rome = 'H1502';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs?caller=1jeune1solution&romes=${rome}&sources=matcha`,
		).reply(200, aListeLaBonneAlternanceApiResponse());

		await testApiHandler<Alternance | ErrorHttpResponse>({
			handler: (req, res) => getAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const body = await res.json();
				expect(body).toEqual(anAlternanceMatcha());
			},
			url: `/alternances/${alternanceId}?rome=${rome}`,
		});
	});
	it('retourne un erreur quand la rome est manquante', async () => {
		const alternanceId = 'g8_DWUYBnYooOG9KzQM_y-0';
		const rome = undefined;
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs?caller=1jeune1solution&romes=${rome}&sources=matcha`,
		).reply(200, aListeLaBonneAlternanceApiResponse());

		await testApiHandler<Alternance | ErrorHttpResponse>({
			handler: (req, res) => getAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const body = await res.json();
				const error = res.status;
				expect(error).toEqual(400);
				expect(body).toEqual({ error: 'les paramètres dans l‘url ne respectent pas le schema de validation' });
			},
			url: `/alternances/${alternanceId}`,
		});
	});
	it('report du monitoring', async () => {
		const alternanceId = 'g8_DWUYBnYooOG9KzQM_y-0';
		const rome = undefined;
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs?caller=1jeune1solution&romes=${rome}&sources=matcha`,
		).reply(200, aListeLaBonneAlternanceApiResponse());

		await testApiHandler<Alternance | ErrorHttpResponse>({
			handler: (req, res) => getAlternanceHandler(req, res),
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const body = await res.json();
				expect(body).toEqual(anAlternanceMatcha());
			},
			url: `/alternances/${alternanceId}?rome=${rome}`,
		});
		expect(configureScope).toHaveBeenCalledTimes(1);
	});
});
