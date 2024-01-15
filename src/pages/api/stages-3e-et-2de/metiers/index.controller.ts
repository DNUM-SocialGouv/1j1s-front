import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { dependencies } from '~/server/start';


export const metierStage3eEt2deRechercheQuerySchema = Joi.object({
	appellationCodes: Joi.array().items(Joi.string()),
	motCle: Joi.string(),
}).xor('motCle', 'appellationCodes').options({ allowUnknown: true });

export async function rechercherAppellationMetierHandler(req: NextApiRequest, res: NextApiResponse<MetierStage3eEt2de[] | ErrorHttpResponse>) {
	const { query } = req;
	const motCle = query.motCle as string | undefined;
	if (motCle) {
		const resultatsRechercheAppellationMetier =
			await dependencies.stage3eEt2deDependencies.rechercherAppellationMetier.handle(motCle);
		return handleResponse(resultatsRechercheAppellationMetier, res);
	}
	const appellationCodes = query.appellationCodes ? queryToArray(query.appellationCodes) : undefined;
	if (appellationCodes) {
		const resultatsRechercheAppellationMetier =
			await dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle(appellationCodes);
		return handleResponse(resultatsRechercheAppellationMetier, res);
	}
}

export default withMonitoring(withValidation({ query: metierStage3eEt2deRechercheQuerySchema }, rechercherAppellationMetierHandler));
