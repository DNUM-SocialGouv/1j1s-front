import { NextApiResponse } from 'next';

import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { handleResponse } from '~/server/utils/handleResponse.util';

interface FakeRésultat {
  data: string
}

describe('handleResponse', () => {
	it('retourne une 200 quand la réponse est success', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createSuccess({ data: 'ok' }), res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('retourne une 503 quand l erreur est SERVICE_INDISPONIBLE', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createFailure(ErreurMétier.SERVICE_INDISPONIBLE), res);

		expect(res.status).toHaveBeenCalledWith(503);
	});

	it('retourne une 400 quand l erreur est DEMANDE_INCORRECTE', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createFailure(ErreurMétier.DEMANDE_INCORRECTE), res);

		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('retourne une 404 quand l erreur est CONTENU_INDISPONIBLE', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createFailure(ErreurMétier.CONTENU_INDISPONIBLE), res);

		expect(res.status).toHaveBeenCalledWith(404);
	});
});
