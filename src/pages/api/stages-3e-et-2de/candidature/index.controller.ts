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

export const envoyerCandidatureStage3eEt2deQuerySchema = Joi.object({
	appellationCode: Joi.string().required(),
	email: Joi.string().email().required(),
	modeDeContact: Joi.string().valid(...Object.values(ModeDeContact)).required(),
	nom: Joi.string().required(),
	prenom: Joi.string().required(),
	siret: Joi.string().required(),
}).options({ allowUnknown: true });

export async function envoyerCandidatureStage3eEt2deHandler(req: NextApiRequest, res: NextApiResponse<undefined | ErrorHttpResponse>) {
	const candidature = mapCandidature(req);
	const reponseEnvoieCandidature = await dependencies.stage3eEt2deDependencies.envoyerCandidatureStage3eEt2deUseCase.handle(candidature);
	return handleResponse(reponseEnvoieCandidature, res);
}

export default withMethods(['POST'], withMonitoring(withValidation({ query: envoyerCandidatureStage3eEt2deQuerySchema }, envoyerCandidatureStage3eEt2deHandler)));

function mapCandidature(req: NextApiRequest): CandidatureStage3eEt2de {
	const query = req.query;
	return {
		appellationCode: String(query.appellationCode),
		email: String(query.email),
		modeDeContact: ModeDeContact[query.modeDeContact as keyof typeof ModeDeContact],
		nom: String(query.nom),
		prenom: String(query.prenom),
		siret: String(query.siret),
	};
}
