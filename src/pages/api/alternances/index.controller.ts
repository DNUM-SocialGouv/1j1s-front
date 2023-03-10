import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { AlternanceFiltre, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { dependencies } from '~/server/start';

export const alternancesQuerySchema = Joi.object({
	codeCommune: Joi.string().required(),
	codeRomes: Joi.string().required(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
});

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<Array<RésultatRechercheAlternance> | ErrorHttpResponse>) {
	const résultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance.handle(alternanceFiltreMapper(req));
	return handleResponse(résultatsRechercheAlternance, res);
}

export default withMonitoring(withValidation({ query: alternancesQuerySchema }, rechercherAlternanceHandler));

export function alternanceFiltreMapper(request: NextApiRequest): AlternanceFiltre {
	const { query } = request;
	return {
		codeCommune: query.codeCommune ? String(query.codeCommune) : '',
		codeRomes: query.codeRomes ? queryToArray(query.codeRomes) : [],
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
	};
}
