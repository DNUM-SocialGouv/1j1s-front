import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import handler from '~/pages/api/stages-3e-et-2de/candidature/index.controller';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { aCandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';
import {
	anApiImmersionFacileStage3eEt2deCandidature,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.fixture';

describe('candidature stage 3e et 2de', () => {
	it('envoie une candidature', async () => {
		// Given
		const candidature = aCandidatureStage3eEt2de();

		nock('https://staging.immersion-facile.beta.gouv.fr/api/v2', {
			reqheaders: { Authorization: 'API_IMMERSION_FACILE_STAGE_3EME_API_KEY' },
		})
			.post('/contact-establishment',
				{ ...anApiImmersionFacileStage3eEt2deCandidature() })
			.reply(201);

		// When
		await testApiHandler({
			pagesHandler: (req, res) => handler(req, res),
			params: { ...candidature },
			test: async ({ fetch }) => {
				const response = await fetch({
					body: JSON.stringify(candidature),
					method: 'POST',
				});

				// Then
				expect(response.status).toBe(200);
			},
			url: '/stages-3e-et-2de/candidature',
		});
	});

	it.each([
		{ modeDeContact: 'invalid' },
		{ appellationCode: undefined },
		{ email: 1 },
	])('répond une 400 quand le paramètre %o est incorrect', async (candidature) => {
		// When
		await testApiHandler({
			pagesHandler: (req, res) => handler(req, res),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			params: { ...aCandidatureStage3eEt2de(candidature) },
			test: async ({ fetch }) => {
				const response = await fetch({
					body: JSON.stringify(candidature),
					method: 'POST',
				});

				// Then
				expect(response.status).toBe(400);
			},
			url: '/stages-3e-et-2de/candidature',
		});
	});

	it.each([
		{ modeDeContact: ModeDeContact.PHONE },
		{ modeDeContact: ModeDeContact.EMAIL },
		{ modeDeContact: ModeDeContact.IN_PERSON },
		{ otherQuery: 'otherQuery' },
	])('répond une 200 quand le paramètre %o est correct', async (candidature) => {
		// Given
		nock('https://staging.immersion-facile.beta.gouv.fr/api/v2', {
			reqheaders: { Authorization: 'API_IMMERSION_FACILE_STAGE_3EME_API_KEY' },
		})
			.post('/contact-establishment',
				{ ...anApiImmersionFacileStage3eEt2deCandidature(candidature.modeDeContact ? { contactMode: candidature.modeDeContact } : {}) })
			.reply(201);

		// When
		await testApiHandler({
			pagesHandler: (req, res) => handler(req, res),
			params: { ...aCandidatureStage3eEt2de(candidature) },
			test: async ({ fetch }) => {
				const response = await fetch({
					body: JSON.stringify(candidature),
					method: 'POST',
				});

				// Then
				expect(response.status).toBe(200);
			},
			url: '/stages-3e-et-2de/candidature',
		});
	});
});
