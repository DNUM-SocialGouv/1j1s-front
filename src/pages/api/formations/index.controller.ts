import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { Formation, FormationFiltre } from '~/server/formations/domain/formation';
import { dependencies } from '~/server/start';

export const formationQuerySchema = Joi.object({
	codeRomes: Joi.string().required(),
	libelleMetier: Joi.string(),
});

export async function rechercherFormationHandler(req: NextApiRequest, res: NextApiResponse<Array<Formation> | ErrorHttpResponse>) {
	const résultatsRechercheFormation = await dependencies.formationDependencies.rechercherFormation.handle(formationFiltreMapper(req));
	return handleResponse(résultatsRechercheFormation, res);
}

export default withMonitoring(withValidation({ query: formationQuerySchema }, rechercherFormationHandler));

export function formationFiltreMapper(request: NextApiRequest): FormationFiltre {
	const { query } = request;
	return {
		codeRomes: query.codeRomes ? queryToArray(query.codeRomes) : [],
	};
}
