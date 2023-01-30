import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import {
	Domaines,
	EmployeurStageCMS,
	LocalisationStageIndexée,
	OffreDeStageDepot,
	SourceDesDonnées,
} from '~/server/cms/domain/offreDeStage.type';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { mailRateLimitMiddleware } from '~/server/middlewares/rateLimit/mail/mailRateLimit';
import { applyRateLimit } from '~/server/middlewares/rateLimit/rateLimit';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

import { OffreDeStageFormulaire } from '../../../client/services/stage/stage.service';
import { validate } from '../middleware/validate.controller';

export const enregistrerOffreDeStageBodySchema = Joi.object({
	adresse: Joi.string().required(),
	code_postal: Joi.string().required(),
	dateDebut: Joi.date().required(),
	departement: Joi.string(),
	descriptionEmployeur: Joi.string().max(200).required(),
	descriptionOffre: Joi.string().min(200).required(),
	domaineStage: Joi.string().required(),
	dureeStage: Joi.string().required(),
	email: Joi.string().email().required(),
	lienCandidature: Joi.string().required(),
	logoEmployeur: Joi.string().uri(),
	nomEmployeur: Joi.string().required(),
	nomOffre: Joi.string().required(),
	pays: Joi.string().required(),
	region: Joi.string(),
	remunerationStage: Joi.number(),
	siteEmployeur: Joi.string().uri(),
	teletravail: Joi.boolean(),
	ville: Joi.string().required(),
});

export async function enregistrerOffreDeStageHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	if (await applyRateLimit(req, res, mailRateLimitMiddleware)) return;

	const offreDeStage = mapEnregistrerOffreDeStage(req.body);

	const responseEnregistrerOffreDeStage = await dependencies
		.cmsIndexDependencies
		.enregistrerOffreDeStage
		.handle(offreDeStage);
	return handleResponse(responseEnregistrerOffreDeStage, res);
}

export default monitoringHandler(validate({ body: enregistrerOffreDeStageBodySchema }, enregistrerOffreDeStageHandler));

const DUREE_MOIS_EN_JOUR = 30;

function mapEnregistrerOffreDeStage(body: OffreDeStageFormulaire): OffreDeStageDepot {
	return {
		dateDeDebut: body.dateDeDebut as string,
		description: body.descriptionOffre as string,
		domaine: body.domaine as Domaines,
		duree: body.duree as string,
		dureeEnJour: Number(body.duree) % DUREE_MOIS_EN_JOUR,
		employeur: {
			description: body.descriptionEmployeur as string,
			logoUrl: body.logoEmployeur as string | undefined,
			nom: body.nomEmployeur as string,
			siteUrl: body.siteEmployeur as string | undefined,
		} as EmployeurStageCMS,
		localisation: {
			codePostal: body.codePostal as string | undefined,
			departement: body.departement as string | undefined,
			pays: body.pays as string,
			region: body.region as string | undefined,
			ville: body.ville as string,
		} as LocalisationStageIndexée,
		remunerationBase: body.remunerationStage as number,
		source: SourceDesDonnées.DEPOT_STAGE,
		teletravailPossible: body.teletravail as boolean | undefined,
		titre: body.titre as string,
		urlDeCandidature: body.urlDeCandidature as string | undefined,
	};
}
