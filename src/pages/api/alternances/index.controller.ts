import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate.controller';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  MAX_PAGE_ALLOWED,
  OffreFiltre,
  RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export const querySchema = Joi.object({
  codeLocalisation: Joi.number(),
  libelleLocalisation: Joi.string(),
  motCle: Joi.string(),
  page: Joi.number().min(1).max(MAX_PAGE_ALLOWED).required(),
  typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
});

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const résultatsRechercheAlternance = await dependencies.offreAlternanceDependencies.rechercherOffreAlternance.handle(alternanceFiltreMapper(req));
  return handleResponse(résultatsRechercheAlternance, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherAlternanceHandler));

export function alternanceFiltreMapper(request: NextApiRequest): OffreFiltre {
  const { query } = request;
  return {
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
  };
}
