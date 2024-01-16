import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { dependencies } from '~/server/start';
import { emailRegex } from '~/shared/emailRegex';

export const enregistrerOffreDeStageBodySchema = Joi.object({
	dateDeDebutMax: Joi.string().required(),
	dateDeDebutMin: Joi.string().required(),
	description: Joi.string().min(200).required(),
	domaine: Joi.string(),
	duree: Joi.string(),
	employeur: Joi.object({
		description: Joi.string().max(500).required(),
		email: Joi.string().pattern(new RegExp(emailRegex)).required(),
		logoUrl: Joi.string().uri(),
		nom: Joi.string().max(255).required(),
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
		.stagesDependencies
		.enregistrerOffreDeStage
		.handle(req.body);
	return handleResponse(responseEnregistrerOffreDeStage, res);
}

export default withMonitoring(withValidation({ body: enregistrerOffreDeStageBodySchema }, enregistrerOffreDeStageHandler));
