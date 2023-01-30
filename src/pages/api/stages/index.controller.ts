import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { OffreDeStageFormulaire } from '~/client/services/stage/stage.service';
import { validate } from '~/pages/api/middleware/validate.controller';
import {
	DomaineStageDepot, EmployeurDepotStage,
	LocalisationDepotStageIndexée,
	OffreDeStageDepot,
	SourceDesDonnées,
} from '~/server/cms/domain/offreDeStage.type';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const enregistrerOffreDeStageBodySchema = Joi.object({
	adresse: Joi.string().required(),
	codePostal: Joi.string().required(),
	dateDebut: Joi.string().required(),
	departement: Joi.string(),
	descriptionEmployeur: Joi.string().max(200).required(),
	descriptionOffre: Joi.string().min(200).required(),
	domaineStage: Joi.string(),
	dureeStage: Joi.string().required(),
	emailEmployeur: Joi.string().email().required(),
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
	const offreStage = mapEnregistrerOffreDeStage(req.body);
	const responseEnregistrerOffreDeStage = await dependencies
		.cmsIndexDependencies
		.enregistrerOffreDeStage
		.handle(offreStage);
	return handleResponse(responseEnregistrerOffreDeStage, res);
}

export default monitoringHandler(validate({ body: enregistrerOffreDeStageBodySchema }, enregistrerOffreDeStageHandler));

const DUREE_MOIS_EN_JOUR = 30;

function mapEnregistrerOffreDeStage(body: OffreDeStageFormulaire): OffreDeStageDepot {
	return {
		dateDeDebut: body.dateDebut,
		description: body.descriptionOffre,
		domaines: body.domaineStage ? [{
			nom: body.domaineStage,
		}] as DomaineStageDepot[] : [],
		dureeEnJour: Number(body.dureeStage) * DUREE_MOIS_EN_JOUR,
		employeur: {
			description: body.descriptionEmployeur,
			email: body.emailEmployeur,
			logoUrl: body.logoEmployeur || null,
			nom: body.nomEmployeur,
			siteUrl: body.siteEmployeur || null,
		} as EmployeurDepotStage,
		identifiantSource: uuidv4(),
		localisation: {
			adresse: body.adresse,
			codePostal: body.codePostal,
			departement: body.departement || null,
			pays: body.pays,
			region: body.region || null,
			ville: body.ville,
		} as LocalisationDepotStageIndexée, 
		//Ajoute l'offre en 'draft' dans le CMS
		publishedAt: null,
		remunerationBase: body.remunerationStage || null,
		source: SourceDesDonnées.INTERNE,
		teletravailPossible: body.teletravail ?? null,
		titre: body.nomOffre,
		urlDeCandidature: body.lienCandidature,
	};
}
