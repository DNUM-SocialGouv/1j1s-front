import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { dependencies } from '~/server/start';

export const querySchema = Joi.object({
	codeCommune: Joi.string().alphanum().max(5),
	libelleCommune: Joi.string().max(100),
	typeAccompagnement: Joi.string().valid('cij','mission_locale','pole_emploi').required(),
});

export async function rechercherÉtablissementAccompagnementHandler(
	req: NextApiRequest,
	res: NextApiResponse<ÉtablissementAccompagnement[] | ErrorHttpResponse>) {
	const { query } = req;
	const résultatsRechercheÉtablissementAccompagnement = await dependencies
		.établissementAccompagnementDependencies
		.rechercherÉtablissementAccompagnementUseCase
		.handle({ commune: String(query.codeCommune), typeAccompagnement: String(query.typeAccompagnement) });
	return handleResponse(résultatsRechercheÉtablissementAccompagnement, res);
}

export default withMonitoring(withValidation({ query: querySchema }, rechercherÉtablissementAccompagnementHandler));
