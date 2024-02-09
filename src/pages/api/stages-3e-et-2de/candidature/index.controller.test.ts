import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import handler from '~/pages/api/stages-3e-et-2de/candidature/index.controller';
import {
	aCandidatureEmailStage3eEt2de, aCandidatureEnPersonneStage3eEt2de,
	aCandidatureTelephoneStage3eEt2de,
} from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de.fixture';
import {
	anApiImmersionFacileStage3eEt2deCandidatureEmail, anApiImmersionFacileStage3eEt2deCandidatureEnPersonne,
	anApiImmersionFacileStage3eEt2deCandidatureTelephone,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.fixture';

describe('candidature stage 3e et 2de', () => {
	describe('lorsque le controller reçoit une candidature par telephone', () => {
		it('envoie une candidature par telephone', async () => {
			// Given
			const candidature = aCandidatureTelephoneStage3eEt2de();

			nock('https://staging.immersion-facile.beta.gouv.fr/api/v2', {
				reqheaders: { Authorization: 'API_IMMERSION_FACILE_STAGE_3EME_API_KEY' },
			})
				.post('/contact-establishment',
					{ ...anApiImmersionFacileStage3eEt2deCandidatureTelephone() })
				.reply(201);

			// When
			await testApiHandler({
				pagesHandler: (req, res) => handler(req, res),
				params: { ...candidature },
				test: async ({ fetch }) => {
					const response = await fetch({
						body: JSON.stringify(candidature),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});

					// Then
					expect(response.status).toBe(200);
				},
				url: '/stages-3e-et-2de/candidature',
			});
		});
	});

	describe('lorsque le controller reçoit une candidature par email', () => {
		it('envoie une candidature par email', async () => {
			// Given
			const candidature = aCandidatureEmailStage3eEt2de();

			nock('https://staging.immersion-facile.beta.gouv.fr/api/v2', {
				reqheaders: { Authorization: 'API_IMMERSION_FACILE_STAGE_3EME_API_KEY' },
			})
				.post('/contact-establishment',
					{ ...anApiImmersionFacileStage3eEt2deCandidatureEmail() })
				.reply(201);

			// When
			await testApiHandler({
				pagesHandler: (req, res) => handler(req, res),
				params: { ...candidature },
				test: async ({ fetch }) => {
					const response = await fetch({
						body: JSON.stringify(candidature),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});

					// Then
					expect(response.status).toBe(200);
				},
				url: '/stages-3e-et-2de/candidature',
			});
		});
	});

	describe('lorsque le controller reçoit une candidature en personne', () => {
		it('envoie une candidature en personne', async () => {
			// Given
			const candidature = aCandidatureEnPersonneStage3eEt2de();

			nock('https://staging.immersion-facile.beta.gouv.fr/api/v2', {
				reqheaders: { Authorization: 'API_IMMERSION_FACILE_STAGE_3EME_API_KEY' },
			})
				.post('/contact-establishment',
					{ ...anApiImmersionFacileStage3eEt2deCandidatureEnPersonne() })
				.reply(201);

			// When
			await testApiHandler({
				pagesHandler: (req, res) => handler(req, res),
				params: { ...candidature },
				test: async ({ fetch }) => {
					const response = await fetch({
						body: JSON.stringify(candidature),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});

					// Then
					expect(response.status).toBe(200);
				},
				url: '/stages-3e-et-2de/candidature',
			});
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
			params: { ...aCandidatureTelephoneStage3eEt2de(candidature) },
			test: async ({ fetch }) => {
				const response = await fetch({
					body: JSON.stringify(candidature),
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
				});

				// Then
				expect(response.status).toBe(400);
			},
			url: '/stages-3e-et-2de/candidature',
		});
	});
});
