import Joi from 'joi';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

export const formationQuerySchema = Joi.object({
	codeCertification: Joi.string(),
	codeCommune: Joi.string().required(),
	codeRomes: Joi.string().required(),
	distanceCommune: Joi.string().required(),
	id: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
});

const getFormationHandler = withMonitoring(async function (req, res) {
	const { id } = req.query;

	const { formation, statistiques } = await dependencies.formationDependencies.consulterFormation.handle(id as string);
	if (isFailure(formation)) return handleResponse(formation, res);
	if (statistiques && isFailure(statistiques)) return handleResponse(statistiques, res);

	return handleResponse(formation, res);
});

export default getFormationHandler;
