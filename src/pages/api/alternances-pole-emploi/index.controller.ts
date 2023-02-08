import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	MAX_PAGE_ALLOWED,
	OffreFiltre,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';

export const alternancesQuerySchema = Joi.object({
	codeLocalisation: Joi.string().alphanum().max(5),
	libelleLocalisation: Joi.string(),
	motCle: Joi.string(),
	page: Joi.number().min(1).max(MAX_PAGE_ALLOWED).required(),
	typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
});

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
	const résultatsRechercheAlternance = await dependencies.offreAlternanceDependencies.rechercherOffreAlternance.handle(alternanceFiltreMapper(req));
	return handleResponse(résultatsRechercheAlternance, res);
}

export default withMonitoring(withValidation({ query: alternancesQuerySchema }, rechercherAlternanceHandler));

export function alternanceFiltreMapper(request: NextApiRequest): OffreFiltre {
	const { query } = request;
	return {
		localisation: mapLocalisation(query),
		motClé: query.motCle ? String(query.motCle) : '',
		page: Number(query.page),
	};
}
