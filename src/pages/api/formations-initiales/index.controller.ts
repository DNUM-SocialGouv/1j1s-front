import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { formationInitialeFiltreMapper } from '~/pages/api/formations-initiales/index.controller.mapper';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export const formationInitialeQuerySchema = Joi.object({
	motCle: Joi.string(),
});

export async function rechercherFormationInitialeHandler(req: NextApiRequest, res: NextApiResponse<Array<FormationInitiale> | ErrorHttpResponse>) {
	const filtreMapped = formationInitialeFiltreMapper(req.query);
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationInitiale.handle(filtreMapped);
	return handleResponse(resultatFormationsInitiales, res);
}


export default withMonitoring(withValidation({ query: formationInitialeQuerySchema }, rechercherFormationInitialeHandler));

