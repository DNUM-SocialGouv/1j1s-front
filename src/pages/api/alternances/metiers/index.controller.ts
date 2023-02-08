import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { dependencies } from '~/server/start';

const querySchema = Joi.object({
	motCle: Joi.string(),
});

export async function récupererSuggestionsMétiersAlternanceHandler(req: NextApiRequest, res: NextApiResponse<Array<MetierAlternance> | ErrorHttpResponse>) {
	const result = await dependencies.alternanceDependencies.récupererSuggestionsMetiersAlternance.handle(requestMapper(req));
	return handleResponse(result, res);
}

export default withMonitoring(withValidation({ query: querySchema }, récupererSuggestionsMétiersAlternanceHandler));

function requestMapper(req: NextApiRequest): string {
	const { query } = req;
	return query.motCle ? String(query.motCle) : '';
}
