import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { transformQueryToArray } from '~/pages/api/utils/joi/joi.util';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { JobÉtudiantFiltre } from '~/server/jobs-étudiants/domain/jobÉtudiant';
import {
	DomaineCode,
	MAX_PAGE_ALLOWED,
	RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';

export const jobsEtudiantsQuerySchema = Joi.object({
	codeLocalisation: Joi.string().alphanum().max(5),
	grandDomaine: transformQueryToArray.array().items(Joi.string().valid(...Object.values(DomaineCode as unknown as Record<string, string>))),
	libelleLocalisation: Joi.string(),
	motCle: Joi.string(),
	page: Joi.number().min(1).max(MAX_PAGE_ALLOWED).required(),
	typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
});

export async function rechercherJobÉtudiantHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
	const résultatsRechercheJobÉtudiant = await dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle(jobÉtudiantFiltreMapper(req));
	return handleResponse(résultatsRechercheJobÉtudiant, res);
}

export default withMonitoring(withValidation({ query: jobsEtudiantsQuerySchema }, rechercherJobÉtudiantHandler));

export function jobÉtudiantFiltreMapper(request: NextApiRequest): JobÉtudiantFiltre {
	const { query } = request;

	return {
		grandDomaineList: query.grandDomaine ? queryToArray(query.grandDomaine) : undefined,
		localisation: mapLocalisation(query),
		motClé: query.motCle ? String(query.motCle) : '',
		page: Number(query.page),
	};
}
