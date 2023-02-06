import { NextApiRequest, NextApiResponse } from 'next';
import { testApiHandler } from 'next-test-api-route-handler';

import { withMethods } from '~/pages/api/middlewares/methods/methods.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';

function handler(req: NextApiRequest, res: NextApiResponse) {
	return res.status(200).end();
}

describe('Method middleware', () => {
	describe('quand la méthode de la requête est permise', () => {
		it.each(['GET', 'POST', 'PUT', 'DELETE'])('joue le handler', async (method: string) => {
			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => withMethods([method], handler)(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method });
					expect(res.status).toEqual(200);
				},
				url: '/entreprises',
			});
		});
	});

	describe('quand la méthode de la requête est interdite', () => {
		it('retourne une erreur 405', async () => {
			await testApiHandler<void | ErrorHttpResponse>({
				handler: (req, res) => withMethods(['GET'], handler)(req, res),
				test: async ({ fetch }) => {
					const res = await fetch({ method: 'POST' });
					expect(res.status).toEqual(405);
				},
				url: '/entreprises',
			});
		});
	});
});
