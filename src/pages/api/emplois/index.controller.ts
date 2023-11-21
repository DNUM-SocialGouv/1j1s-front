import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { transformQueryToArray } from '~/pages/api/utils/joi/joi.util';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { DomaineCode, MAX_PAGE_ALLOWED_BY_POLE_EMPLOI, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';

type RequestQuery = Partial<{[p: string]: string | string[]}>;

export const emploisQuerySchema = Joi.object({
	codeLocalisation: Joi.string().alphanum().max(5),
	experienceExigence: Joi.string().valid('D', 'S', 'E'),
	grandDomaine: transformQueryToArray.array().items(Joi.string().valid(...Object.values(DomaineCode as unknown as Record<string, string>))),
	motCle: Joi.string(),
	page: Joi.number().min(1).max(MAX_PAGE_ALLOWED_BY_POLE_EMPLOI).required(),
	tempsDeTravail: Joi.string().valid('tempsPlein', 'tempsPartiel', 'indifférent'),
	typeDeContrats: transformQueryToArray.array().items(Joi.string().valid('CDD', 'CDI', 'SAI', 'MIS')),
	typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
}).options({ allowUnknown: true });

export async function rechercherOffreEmploiHandler(
	req: NextApiRequest,
	res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
	const params = emploiFiltreMapper(req.query);
	const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle(params);
	return handleResponse(résultatsRechercheOffreEmploi, res);
}

export default withMonitoring(withValidation({ query: emploisQuerySchema }, rechercherOffreEmploiHandler));

export function emploiFiltreMapper(query: RequestQuery): EmploiFiltre {
	return {
		experienceExigence: query.experienceExigence ? String(query.experienceExigence) : undefined,
		grandDomaineList: query.grandDomaine ? queryToArray(query.grandDomaine) : undefined,
		localisation: mapLocalisation(query),
		motClé: query.motCle ? String(query.motCle) : undefined,
		page: Number(query.page),
		tempsDeTravail: query.tempsDeTravail ? String(query.tempsDeTravail) : undefined,
		typeDeContratList: query.typeDeContrats ? queryToArray(query.typeDeContrats) : undefined,
	};
}
