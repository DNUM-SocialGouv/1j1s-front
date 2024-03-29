import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { formationInitialeRechercheFiltreMapper } from '~/pages/api/formations-initiales/formationInitialeFiltreMapper';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export const formationInitialeQuerySchema = Joi.object({
	motCle: Joi.string(),
	page: Joi.string(),
});

export type FormationInitialeQueryParams = {
	motCle?: string
	page?: string
}

export async function rechercherFormationInitialeHandler(req: NextApiRequest, res: NextApiResponse<ResultatRechercheFormationsInitiales | ErrorHttpResponse>) {
	const filtreMapped = formationInitialeRechercheFiltreMapper(req.query);
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationInitiale.handle(filtreMapped);
	return handleResponse(resultatFormationsInitiales, res);
}


export default withMonitoring(withValidation({ query: formationInitialeQuerySchema }, rechercherFormationInitialeHandler));

