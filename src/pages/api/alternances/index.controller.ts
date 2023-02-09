import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	Alternance,
	AlternanceQuery,
} from '~/server/alternances/domain/alternance';
import { dependencies } from '~/server/start';

export const alternancesQuerySchema = Joi.object({
	codeRomes: Joi.string(),
});

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<Array<Alternance> | ErrorHttpResponse>) {
	const résultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance.handle(alternanceFiltreMapper(req));
	return handleResponse(résultatsRechercheAlternance, res);
}

export default withMonitoring(withValidation({ query: alternancesQuerySchema }, rechercherAlternanceHandler));

export function alternanceFiltreMapper(request: NextApiRequest): AlternanceQuery {
	const { query } = request;
	return {
		codeRomes: queryToArray(query.codeRomes),
	};
}
