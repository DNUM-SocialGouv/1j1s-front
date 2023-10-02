import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { EmploiEuropeFiltre } from '~/server/emplois-europe/domain/emploiEurope';
import { dependencies } from '~/server/start';

export const emploiEuropeRechercheQuerySchema = Joi.object({
	motCle: Joi.string(),
}).options({ allowUnknown: true });

export async function rechercherEmploiEuropeHandler(req: NextApiRequest, res: NextApiResponse) {
	const params = emploiEuropeFiltreMapper(req);
	const resultatsRechercheEmploiEurope = await dependencies.emploiEuropeDependencies.rechercherEmploiEuropeUseCase.handle(params);
	return handleResponse(resultatsRechercheEmploiEurope, res);
}

export default withMonitoring(withValidation({ query: emploiEuropeRechercheQuerySchema }, rechercherEmploiEuropeHandler));

export function emploiEuropeFiltreMapper(request: NextApiRequest): EmploiEuropeFiltre {
	const { query } = request;
	return {
		motCle: query.motCle as string,
	};
}
