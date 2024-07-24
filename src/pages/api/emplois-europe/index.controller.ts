import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { EmploiEuropeFiltre } from '~/server/emplois-europe/domain/emploiEurope';
import { NiveauDEtude } from '~/server/emplois-europe/domain/niveauDEtudes';
import { EMPLOIS_EUROPE_LAST_VISIBLE_PAGE_ALLOWED } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { dependencies } from '~/server/start';

export const emploiEuropeRechercheQuerySchema = Joi.object({
	codePays: Joi.string(),
	motCle: Joi.string(),
	niveauEtude: Joi.string(),
	page: Joi.number().min(1).max(EMPLOIS_EUROPE_LAST_VISIBLE_PAGE_ALLOWED).required(),
	secteurActivite: Joi.string(),
	tempsDeTravail: Joi.string(),
	typeContrat: Joi.string(),
}).options({ allowUnknown: true });

export async function rechercherEmploiEuropeHandler(req: NextApiRequest, res: NextApiResponse) {
	const params = emploiEuropeFiltreMapper(req);
	const resultatsRechercheEmploiEurope = await dependencies.emploiEuropeDependencies.rechercherEmploiEuropeUseCase.handle(params);
	return handleResponse(resultatsRechercheEmploiEurope, res);
}

export default withMonitoring(withValidation({ query: emploiEuropeRechercheQuerySchema }, rechercherEmploiEuropeHandler));

export function emploiEuropeFiltreMapper(request: NextApiRequest): EmploiEuropeFiltre {
	const { query } = request;
	return {
		codePays: query.codePays as string | undefined,
		motCle: query.motCle as string | undefined,
		// TODO (BRUJ 24/07/2024): trouver un moyen pour ne pas mettre de as
		niveauEtude: query.niveauEtudes ? queryToArray(query.niveauEtudes) as Array<NiveauDEtude> : [],
		page: Number(query.page),
		secteurActivite: query.secteurActivite ? queryToArray(query.secteurActivite) : [],
		tempsDeTravail: query.tempsDeTravail ? queryToArray(query.tempsDeTravail) : [],
		typeContrat: query.typeContrat ? queryToArray(query.typeContrat) : [],
	};
}
