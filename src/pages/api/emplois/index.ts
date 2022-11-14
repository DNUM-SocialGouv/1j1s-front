import Joi from 'joi';
import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { validate } from '~/pages/api/middleware/validate';
import { transformQueryToArray } from '~/pages/api/validate.utils';
import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  MAX_PAGE_ALLOWED,
  RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import {
  mapLocalisation,
} from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';
import { queryToArray } from '~/server/utils/queryToArray.utils';


const querySchema = Joi.object({
  codeLocalisation: Joi.number(),
  experienceExigence: Joi.string().valid('D', 'S', 'E'),
  grandDomaineList: transformQueryToArray.array().items(Joi.string().valid('M', 'B', 'C', 'F', 'D', 'E', 'M14', 'M13', 'A', 'G', 'C15', 'H', 'M18', 'I', 'M17', 'M15', 'J', 'M16', 'K', 'L', 'L14', 'N')),
  libelleLocalisation: Joi.string(),
  motCle: Joi.string(),
  page: Joi.number().max(MAX_PAGE_ALLOWED).required(),
  tempsDeTravail: Joi.string().valid('tempsPlein', 'tempsPartiel', 'indifférent'),
  typeDeContrats: transformQueryToArray.array().items(Joi.string().valid('CDD', 'CDI', 'SAI', 'MIS')),
  typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
});

export async function rechercherOffreEmploiHandler(
  req: NextApiRequest,
  res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const params = emploiFiltreMapper(req);
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle(params);
  return handleResponse(résultatsRechercheOffreEmploi, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherOffreEmploiHandler));

export function emploiFiltreMapper(request: NextApiRequest): EmploiFiltre {
  const { query } = request;

  return {
    experienceExigence: query.experienceExigence ? String(query.experienceExigence) : undefined,
    grandDomaineList: query.grandDomaine ? queryToArray(query.grandDomaine) : undefined,
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : undefined,
    page: Number(query.page),
    tempsDeTravail: query.tempsDeTravail ? String(query.tempsDeTravail) : undefined,
    typeDeContratList: query.typeDeContrats ? queryToArray(query.typeDeContrats) : undefined,
  };
}
