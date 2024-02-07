import { NextApiResponse } from 'next';

import { handleResponse } from '~/pages/api/utils/response/response.util';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

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

		handleResponse<FakeRésultat>(createFailure(ErreurMetier.SERVICE_INDISPONIBLE), res);

		expect(res.status).toHaveBeenCalledWith(503);
	});

	it('retourne une 400 quand l erreur est DEMANDE_INCORRECTE', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createFailure(ErreurMetier.DEMANDE_INCORRECTE), res);

		expect(res.status).toHaveBeenCalledWith(400);
	});

	it('retourne une 404 quand l erreur est CONTENU_INDISPONIBLE', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse<FakeRésultat>(createFailure(ErreurMetier.CONTENU_INDISPONIBLE), res);

		expect(res.status).toHaveBeenCalledWith(404);
	});

	it('retourne une 409 quand l erreur est CONFLIT_D_IDENTIFIANT', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse(createFailure(ErreurMetier.CONFLIT_D_IDENTIFIANT), res);

		expect(res.status).toHaveBeenCalledWith(409);
	});

	it('retourne une 500 quand l erreur est inconnue', () => {
		const res = {
			json: jest.fn(),
			status: jest.fn(),
		} as unknown as NextApiResponse;
		jest.spyOn(res, 'status').mockReturnValue(res);

		handleResponse(createFailure('erreur inconnue' as ErreurMetier), res);

		expect(res.status).toHaveBeenCalledWith(500);
	});
});
