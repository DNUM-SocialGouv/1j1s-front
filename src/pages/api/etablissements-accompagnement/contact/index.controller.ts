import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const demandeContactAccompagnementBodySchema = Joi.object({
  age: Joi.number().min(16).max(30).required(),
  codeCommune: Joi.string().alphanum().length(5).required(),
  commentaire: Joi.string(),
  email: Joi.string().email().required(),
  nom: Joi.string().required(),
  nomCommune: Joi.string().required(),
  prénom: Joi.string().required(),
  téléphone: Joi.string().required(),
  établissement: Joi.object({
    email: Joi.string().email().required(),
    nom: Joi.string().required(),
    type: Joi.string().valid('cij','mission_locale','pole_emploi').required(),
  }).required(),
});

export async function envoyerDemandeContactAccompagnementHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
  const responseEnvoyerEmail = await dependencies
    .demandeDeContactDependencies
    .envoyerDemandeDeContactAccompagnementUseCase
    .handle(req.body);
  return handleResponse(responseEnvoyerEmail, res);
}

export default monitoringHandler(validate({ body: demandeContactAccompagnementBodySchema }, envoyerDemandeContactAccompagnementHandler));
