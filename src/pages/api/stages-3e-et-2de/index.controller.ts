import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';
import { dependencies } from '~/server/start';

export const stage3eEt2deRechercheQuerySchema = Joi.object({
	codeMetier: Joi.string(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
});

export async function rechercherStage3eEt2deHandler(req: NextApiRequest, res: NextApiResponse<ResultatRechercheStage3eEt2de | ErrorHttpResponse>) {
	const filtresDeRecherche = stage3eEt2deFiltreMapper(req);
	const resultatsRechercheStage3eEt2de = await dependencies.stage3eEt2deDependencies.rechercherStage3eEt2de.handle(filtresDeRecherche);
	return handleResponse(resultatsRechercheStage3eEt2de, res);
}

export default withMonitoring(withValidation({ query: stage3eEt2deRechercheQuerySchema }, rechercherStage3eEt2deHandler));

function stage3eEt2deFiltreMapper(request: NextApiRequest) {
	const { query } = request;
	return {
		codeMetier: query.codeMetier ? String(query.codeMetier) : undefined,
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
	};
}
