import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import phone from 'phone';

import { withMethods } from '~/pages/api/middlewares/methods/methods.middleware';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { withValidation } from '~/pages/api/middlewares/validation/validation.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { dependencies } from '~/server/start';
import { emailRegex } from '~/shared/emailRegex';

const contactLesEntreprisesSEngagentSchema = Joi.object({
	codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(), // Regex utilsée côté LEE
	email: Joi.string().pattern(new RegExp(emailRegex)).required(),
	nom: Joi.string().required(),
	nomSociété: Joi.string().required(),
	prénom: Joi.string().required(),
	secteur: Joi.string().valid(...Object.keys(SecteurDActivité)).required(),
	siret: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(14).required(),
	taille: Joi.string().valid(...Object.keys(TailleDEntreprise)).required(),
	travail: Joi.string().required(),
	téléphone: Joi.string().custom(validatePhone).required(),
	ville: Joi.string().required(),
}).options({ allowUnknown: true });

function validatePhone(input: string): string {
	const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false });
	if (!isValid) {
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}

export async function enregistrerEntreprisesHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const response = await dependencies.entrepriseDependencies.lesEntreprisesSEngagentUseCase.rejoindreLaMobilisation(req.body);
	return handleResponse(response, res);
}

export default withMonitoring(
	withMethods(['POST'],
		withValidation({ body: contactLesEntreprisesSEngagentSchema },
			enregistrerEntreprisesHandler,
		)));

