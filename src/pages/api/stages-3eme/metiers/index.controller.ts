import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';
import { dependencies } from '~/server/start';

export const metierStage3emeRechercheQuerySchema = Joi.object({
	motCle: Joi.string().required(),
}).options({ allowUnknown: true });

export async function rechercherAppellationMetierHandler(req: NextApiRequest, res: NextApiResponse<MetierStage3eme[] | ErrorHttpResponse>) {
	const params = metierStage3emeFiltreMapper(req);
	const resultatsRechercheAppellationMetier = await dependencies.stage3emeDependencies.rechercherAppellationMetier.handle(params);
	return handleResponse(resultatsRechercheAppellationMetier, res);
}

export default withMonitoring(withValidation({ query: metierStage3emeRechercheQuerySchema }, rechercherAppellationMetierHandler));

function metierStage3emeFiltreMapper(request: NextApiRequest) {
	const { query } = request;
	return query.motCle as string;
}
