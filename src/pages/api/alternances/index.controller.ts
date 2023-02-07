import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
	OffreFiltre,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const alternancesQuerySchema = Joi.object({
	domaine: Joi.string().optional(),
	localisation: Joi.string(),
	motCle: Joi.string(),
	rayon: Joi.string(),
});

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
	const résultatsRechercheAlternance = await dependencies.offreAlternanceDependencies.rechercherOffreAlternance.handle(req.query);
	return handleResponse(résultatsRechercheAlternance, res);
}

export default monitoringHandler(validate({ query: alternancesQuerySchema }, rechercherAlternanceHandler));

export function alternanceFiltreMapper(request: NextApiRequest): OffreFiltre {
	const { query } = request;
	return {
		localisation: mapLocalisation(query),
		motClé: query.motCle ? String(query.motCle) : '',
		page: Number(query.page),
	};
}
