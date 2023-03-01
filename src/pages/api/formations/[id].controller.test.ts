import { configureScope } from '@sentry/nextjs';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import getFormationHandler from '~/pages/api/formations/[id].controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { Formation } from '~/server/formations/domain/formation';
import { aFormation } from '~/server/formations/domain/formation.fixture';
import {
	aLaBonneAlternanceApiFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';

jest.mock('@sentry/nextjs', () => {
	const sentry = jest.requireActual('@sentry/nextjs');

	return ({
		...sentry,
		configureScope: jest.fn(),
	});
});

describe('consulter formation', () => {
	beforeEach(() => {
		(configureScope as jest.Mock).mockClear();
	});
	it('retourne une formation', async () => {
		const formationId = 'formationId';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/formations/formationDescription/${formationId}`,
		).reply(200, aLaBonneAlternanceApiFormationResponse());

		await testApiHandler<Formation | ErrorHttpResponse>({
			handler: (req, res) => getFormationHandler(req, res),
			params: { id: formationId },
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aFormation());
			},
			url: `/formations/${formationId}`,
		});
	});

	it('report du monitoring', async () => {
		const formationId = 'formationId';
		nock('https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/v1/').get(
			`/formations/formationDescription/${formationId}`,
		).reply(200, aLaBonneAlternanceApiFormationResponse());

		await testApiHandler<Formation | ErrorHttpResponse>({
			handler: (req, res) => getFormationHandler(req, res),
			params: { id: formationId },
			test: async ({ fetch }) => {
				const res = await fetch({ method: 'GET' });
				const json = await res.json();
				expect(json).toEqual(aFormation());
			},
			url: `/formations/${formationId}`,
		});
		expect(configureScope).toHaveBeenCalledTimes(1);
	});
});
