import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import { Age, DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import {
	ContactÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const demandeContactAccompagnementBodySchema = Joi.object({
	age: Joi.number().min(16).max(30).required(),
	commentaire: Joi.string().allow(''),
	commune: Joi.string().required(),
	email: Joi.string().email().allow(''),
	nom: Joi.string().required(),
	prénom: Joi.string().required(),
	téléphone: Joi.string().required(),
	établissement: Joi.object({
		email: Joi.string().email().required(),
		nom: Joi.string().required(),
		type: Joi.string().valid('cij','mission_locale','pole_emploi').required(),
	}).required(),
});

export async function envoyerDemandeContactAccompagnementHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const demandeDeContactAccompagnement = mapDemandeContactAccompagnement(req.body);

	const responseEnvoyerEmail = await dependencies
		.demandeDeContactDependencies
		.envoyerDemandeDeContactAccompagnementUseCase
		.handle(demandeDeContactAccompagnement);
	return handleResponse(responseEnvoyerEmail, res);
}

export default monitoringHandler(validate({ body: demandeContactAccompagnementBodySchema }, envoyerDemandeContactAccompagnementHandler));

function mapDemandeContactAccompagnement(body: Record<string, unknown>): DemandeDeContactAccompagnement {
	return {
		age: body.age as Age,
		commentaire: body.commentaire as string || undefined,
		commune: body.commune as string,
		email: body.email as string || undefined,
		nom: body.nom as string,
		prénom: body.prénom as string,
		téléphone: body.téléphone as string,
		établissement: {
			email: (body.établissement as ContactÉtablissementAccompagnement).email as string,
			nom: (body.établissement as ContactÉtablissementAccompagnement).nom as string,
			type: (body.établissement as ContactÉtablissementAccompagnement).type as TypeÉtablissement,
		},
	};
}
