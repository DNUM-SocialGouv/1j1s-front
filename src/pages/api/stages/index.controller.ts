import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { dependencies } from '~/server/start';

export const enregistrerOffreDeStageBodySchema = Joi.object({
	dateDeDebut: Joi.string().required(),
	description: Joi.string().min(200).required(),
	domaine: Joi.string(),
	duree: Joi.string(),
	employeur: Joi.object({
		description: Joi.string().max(200).required(),
		email: Joi.string().email().required(),
		logoUrl: Joi.string().uri(),
		nom: Joi.string().required(),
		siteUrl: Joi.string().uri(),
	}),
	localisation: Joi.object({
		adresse: Joi.string().required(),
		codePostal: Joi.string().required(),
		departement: Joi.string(),
		pays: Joi.string().required(),
		region: Joi.string(),
		ville: Joi.string().required(),
	}),
	remunerationBase: Joi.number(),
	teletravailPossible: Joi.boolean(),
	titre: Joi.string().required(),
	urlDeCandidature: Joi.string().required(),
});

export async function enregistrerOffreDeStageHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const responseEnregistrerOffreDeStage = await dependencies
		.cmsIndexDependencies
		.enregistrerOffreDeStage
		.handle(req.body);
	return handleResponse(responseEnregistrerOffreDeStage, res);
}

export default withMonitoring(withValidation({ body: enregistrerOffreDeStageBodySchema }, enregistrerOffreDeStageHandler));
