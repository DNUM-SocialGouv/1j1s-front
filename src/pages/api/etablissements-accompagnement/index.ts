import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const querySchema = Joi.object({
  codeCommune: Joi.string(),
  libelleCommune: Joi.string(),
});

export async function rechercherÉtablissementAccompagnementHandler(
  req: NextApiRequest,
  res: NextApiResponse<ÉtablissementAccompagnement[] | ErrorHttpResponse>) {
  const { query } = req;
  const résultatsRechercheÉtablissementAccompagnement = await dependencies
    .établissementAccompagnementDependencies
    .rechercherÉtablissementAccompagnementUseCase
    .handle(String(query.codeCommune));
  return handleResponse(résultatsRechercheÉtablissementAccompagnement, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherÉtablissementAccompagnementHandler));
