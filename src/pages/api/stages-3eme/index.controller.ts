import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';
import { dependencies } from '~/server/start';

export const stage3emeRechercheQuerySchema = Joi.object({
	codeMetier: Joi.string(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
});

export async function rechercherStage3emeHandler(req: NextApiRequest, res: NextApiResponse<ResultatRechercheStage3eme | ErrorHttpResponse>) {
	const filtresDeRecherche = stage3emeFiltreMapper(req);
	const resultatsRechercheStage3eme = await dependencies.stage3emeDependencies.rechercherStage3eme.handle(filtresDeRecherche);
	return handleResponse(resultatsRechercheStage3eme, res);
}

export default withMonitoring(withValidation({ query: stage3emeRechercheQuerySchema }, rechercherStage3emeHandler));

function stage3emeFiltreMapper(request: NextApiRequest) {
	const { query } = request;
	return {
		codeMetier: query.codeMetier ? String(query.codeMetier) : undefined,
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
	};
}
