import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { dependencies } from '~/server/start';


export const metierStage3eEt2deRechercheQuerySchema = Joi.object({
	motCle: Joi.string().required(),
}).options({ allowUnknown: true });

export async function rechercherAppellationMetierHandler(req: NextApiRequest, res: NextApiResponse<MetierStage3eEt2de[] | ErrorHttpResponse>) {
	const params = metierStage3eEt2deFiltreMapper(req);
	const resultatsRechercheAppellationMetier = await dependencies.stage3eEt2deDependencies.rechercherAppellationMetier.handle(params);
	return handleResponse(resultatsRechercheAppellationMetier, res);
}

export default withMonitoring(withValidation({ query: metierStage3eEt2deRechercheQuerySchema }, rechercherAppellationMetierHandler));

function metierStage3eEt2deFiltreMapper(request: NextApiRequest) {
	const { query } = request;
	return query.motCle as string;
}
