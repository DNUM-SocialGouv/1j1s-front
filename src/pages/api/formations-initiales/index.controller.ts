import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { FormationInitiale, FormationInitialeFiltre } from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export const formationInitialeQuerySchema = Joi.object({
	motCle: Joi.string(),
});

export async function rechercherFormationInitialeHandler(req: NextApiRequest, res: NextApiResponse<Array<FormationInitiale> | ErrorHttpResponse>) {
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationInitiale.handle(formationInitialeFiltreMapper(req));
	return handleResponse(resultatFormationsInitiales, res);
}

export function formationInitialeFiltreMapper(request: NextApiRequest): FormationInitialeFiltre {
	const { query } = request;
	return {
		motCle: query.motCle ? String(query.motCle) : '',
	};
}


export default withMonitoring(withValidation({ query: formationInitialeQuerySchema }, rechercherFormationInitialeHandler));

