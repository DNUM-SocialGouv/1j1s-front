import Joi from 'joi';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';
import { dependencies } from '~/server/start';

const validation = Joi.object({
	id: Joi.string().required().not().empty(),
	rome: Joi.string().required().not().empty(),
});

const getAlternanceHandler = withMonitoring(withValidation({ query: validation }, async function(req, res) {
	const alternance = await dependencies.alternanceDependencies.consulterAlternance.handle(req.query.id as string, req.query.rome as string);
	return handleResponse(alternance, res);
}));

export default  getAlternanceHandler;
