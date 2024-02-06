import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '~/pages/api/middlewares/methods/methods.middleware';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	CandidatureStage3eEt2de,
	ModeDeContact,
} from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { dependencies } from '~/server/start';

const envoyerCandidatureTelephoneStage3eEt2deQuerySchema = Joi.object({
	appellationCode: Joi.string().required(),
	email: Joi.string().email().required(),
	modeDeContact: Joi.string().valid(ModeDeContact.PHONE).required(),
	nom: Joi.string().required(),
	prenom: Joi.string().required(),
	siret: Joi.string().required(),
}).options({ allowUnknown: true });

const envoyerCandidatureEmailStage3eEt2deQuerySchema = Joi.object({
	appellationCode: Joi.string().required(),
	email: Joi.string().email().required(),
	message: Joi.string().required(),
	modeDeContact: Joi.string().valid(ModeDeContact.EMAIL).required(),
	nom: Joi.string().required(),
	objectif: Joi.string().required(),
	prenom: Joi.string().required(),
	siret: Joi.string().required(),
	telephone: Joi.string().required(),
}).options({ allowUnknown: true });

const envoyerCandidatureEnPersonneStage3eEt2deQuerySchema = Joi.object({
	appellationCode: Joi.string().required(),
	email: Joi.string().email().required(),
	modeDeContact: Joi.string().valid(ModeDeContact.IN_PERSON).required(),
	nom: Joi.string().required(),
	prenom: Joi.string().required(),
	siret: Joi.string().required(),
}).options({ allowUnknown: true });

export const envoyerCandidatureStage3eEt2deQuerySchema = Joi.alternatives().try(
	envoyerCandidatureTelephoneStage3eEt2deQuerySchema,
	envoyerCandidatureEmailStage3eEt2deQuerySchema,
	envoyerCandidatureEnPersonneStage3eEt2deQuerySchema,
);

export async function envoyerCandidatureStage3eEt2deHandler(req: NextApiRequest, res: NextApiResponse<undefined | ErrorHttpResponse>) {
	const candidature = mapCandidature(req);
	const reponseEnvoieCandidature = await dependencies.stage3eEt2deDependencies.envoyerCandidatureStage3eEt2deUseCase.handle(candidature);
	return handleResponse(reponseEnvoieCandidature, res);
}

export default withMethods(['POST'], withMonitoring(withValidation({ body: envoyerCandidatureStage3eEt2deQuerySchema }, envoyerCandidatureStage3eEt2deHandler)));

function mapCandidature(req: NextApiRequest): CandidatureStage3eEt2de {
	const body = req.body;
	if (body.modeDeContact === ModeDeContact.PHONE) {
		return {
			appellationCode: String(body.appellationCode),
			email: String(body.email),
			modeDeContact: ModeDeContact.PHONE,
			nom: String(body.nom),
			prenom: String(body.prenom),
			siret: String(body.siret),
		};
	}
	if (body.modeDeContact === ModeDeContact.EMAIL) {
		return {
			appellationCode: String(body.appellationCode),
			email: String(body.email),
			message: String(body.message),
			modeDeContact: ModeDeContact.EMAIL,
			nom: String(body.nom),
			objectif: String(body.objectif),
			prenom: String(body.prenom),
			siret: String(body.siret),
			telephone: String(body.telephone),
		};
	}
	return {
		appellationCode: String(body.appellationCode),
		email: String(body.email),
		modeDeContact: ModeDeContact.IN_PERSON,
		nom: String(body.nom),
		prenom: String(body.prenom),
		siret: String(body.siret),
	};
}
