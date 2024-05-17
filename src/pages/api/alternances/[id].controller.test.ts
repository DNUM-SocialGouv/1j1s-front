import { configureScope } from '@sentry/nextjs';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Alternance } from '~/server/alternances/domain/alternance';
import { aDetailMatchaAlternance } from '~/server/alternances/domain/alternance.fixture';
import {
	aMatchaResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';

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
		const alternanceId = '63c53c3566193e05691e9ce1';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs/matcha/${alternanceId}`,
		).reply(200, { matchas: [aMatchaResponse()] });

		await testApiHandler<Alternance | ErrorHttpResponse>({
			pagesHandler: (req, res) => getAlternanceHandler(req, res),
			params: { id: alternanceId },
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const body = await res.json();
				expect(body).toEqual(aDetailMatchaAlternance());
			},
			url: `/alternances/${alternanceId}`,
		});
	});
	it('report du monitoring', async () => {
		const alternanceId = '63c53c3566193e05691e9ce1';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/jobs/matcha/${alternanceId}`,
		).reply(200, { matchas: [aMatchaResponse()] });

		await testApiHandler<Alternance | ErrorHttpResponse>({
			pagesHandler: (req, res) => getAlternanceHandler(req, res),
			params: { id: alternanceId },
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const body = await res.json();
				expect(body).toEqual(aDetailMatchaAlternance());
			},
			url: `/alternances/${alternanceId}`,
		});
		expect(configureScope).toHaveBeenCalledTimes(1);
	});
});
