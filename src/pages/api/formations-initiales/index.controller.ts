import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
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
	const filtreMapped = formationInitialeFiltreMapper(req.query);
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationInitiale.handle(filtreMapped);
	return handleResponse(resultatFormationsInitiales, res);
}

export function formationInitialeFiltreMapper(query: FormationInitialeQueryParams): FormationInitialeFiltre {
	return {
		// NOTE (BRUJ 04-07-2023): Utilisation particulière (sans utiliser getSingleQueryParam) pour garder le param motCle sans le passer à undefined
		motCle: query.motCle ? String(query.motCle) : '',
	};
}


export default withMonitoring(withValidation({ query: formationInitialeQuerySchema }, rechercherFormationInitialeHandler));

