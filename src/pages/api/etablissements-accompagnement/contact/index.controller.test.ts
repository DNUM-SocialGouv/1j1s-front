import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import {
	demandeContactAccompagnementBodySchema,
	envoyerDemandeContactAccompagnementHandler,
} from '~/pages/api/etablissements-accompagnement/contact/index.controller';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { Mail } from '~/server/mail/domain/mail';
import { aTipimailRequest } from '~/server/mail/infra/repositories/tipimail.fixture';

describe('envoyer une demande de contact', () => {
	describe('lorsque le body est valide', () => {
		it('retourne un status 200', async () => {
			let tipimailDemandeDeContact: Mail;
			const expectedBody = aTipimailRequest();
			nock('https://api.tipimail.com/v1')
				.post('/messages/send', (body) => { tipimailDemandeDeContact = body; return true; })
				.reply(200);

			await testApiHandler<void | ErrorHttpResponse>({
				pagesHandler: (req, res) => envoyerDemandeContactAccompagnementHandler(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({
						body: JSON.stringify(aDemandeDeContactAccompagnement()),
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
					});

					expect(res.status).toEqual(200);
					expect(tipimailDemandeDeContact).toEqual(expectedBody);
				},
				url: '/etablissements-accompagnement/contact',
			});
		});
	});

	describe('lorsque le body est invalide', () => {
		it('retourne un status 400', async () => {
			const result = demandeContactAccompagnementBodySchema.validate(aDemandeDeContactAccompagnement({ établissement:{
				email: 'email@example.com',
				nom:'nom de l‘établissement',
				// @ts-expect-error
				type: 'mauvais nom',
			} }));

			expect(result.error?.name).toEqual('ValidationError');
			expect(result.error?.message).toEqual('"établissement.type" must be [mission_locale]');
		});
	});
});
