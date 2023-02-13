import Joi from 'joi';

import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

const validation = Joi.object({
	rome: Joi.string().required().not().empty(),
});

const getAlternanceHandler = withValidation({ query: validation }, async function(req, res) {
	return handleResponse(createSuccess(uneAlternance()), res);
});

export default  getAlternanceHandler;
