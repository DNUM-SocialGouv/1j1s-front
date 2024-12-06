import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { mockGetCurrentScope } from '~/client/components/sentry-nextjs.mock';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Alternance } from '~/server/alternances/domain/alternance';
import { aDetailMatchaAlternance } from '~/server/alternances/domain/alternance.fixture';
import { aMatchaResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.fixture';

import getAlternanceHandler from './[id].controller';

describe('rechercher alternance', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('retourne une alternance', async () => {
		mockGetCurrentScope({});
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
		const mockSetTag = jest.fn();
		mockGetCurrentScope({ setTag: mockSetTag });

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
		expect(mockSetTag).toHaveBeenCalledTimes(2);
	});
});
