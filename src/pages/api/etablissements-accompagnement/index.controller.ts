import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { applyRateLimit } from '~/server/middlewares/rateLimit/rateLimit';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const querySchema = Joi.object({
	codeCommune: Joi.string().alphanum().max(5),
	libelleCommune: Joi.string().max(100),
	typeAccompagnement: Joi.string().valid('cij','mission_locale','pole_emploi').required(),
});

export async function rechercherÉtablissementAccompagnementHandler(
	req: NextApiRequest,
	res: NextApiResponse<ÉtablissementAccompagnement[] | ErrorHttpResponse>) {
	if (await applyRateLimit(req, res)) return;

	const { query } = req;
	const résultatsRechercheÉtablissementAccompagnement = await dependencies
		.établissementAccompagnementDependencies
		.rechercherÉtablissementAccompagnementUseCase
		.handle({ commune: String(query.codeCommune), typeAccompagnement: String(query.typeAccompagnement) });
	return handleResponse(résultatsRechercheÉtablissementAccompagnement, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherÉtablissementAccompagnementHandler));
