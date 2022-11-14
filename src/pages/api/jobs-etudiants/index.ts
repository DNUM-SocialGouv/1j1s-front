import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

import { validate } from '~/pages/api/middleware/validate';
import { transformQueryToArray } from '~/pages/api/validate.utils';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { JobÉtudiantFiltre } from '~/server/jobs-étudiants/domain/jobÉtudiant';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  MAX_PAGE_ALLOWED,
  RésultatsRechercheOffre,
} from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';
import { queryToArray } from '~/server/utils/queryToArray.utils';

const querySchema = Joi.object({
  codeLocalisation: Joi.number(),
  grandDomaineList: transformQueryToArray.array().items(Joi.string().valid('M', 'B', 'C', 'F', 'D', 'E', 'M14', 'M13', 'A', 'G', 'C15', 'H', 'M18', 'I', 'M17', 'M15', 'J', 'M16', 'K', 'L', 'L14', 'N')),
  libelleLocalisation: Joi.string(),
  motCle: Joi.string(),
  page: Joi.number().max(MAX_PAGE_ALLOWED).required(),
  typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
});

export async function rechercherJobÉtudiantHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const résultatsRechercheJobÉtudiant = await dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle(jobÉtudiantFiltreMapper(req));
  return handleResponse(résultatsRechercheJobÉtudiant, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherJobÉtudiantHandler));

export function jobÉtudiantFiltreMapper(request: NextApiRequest): JobÉtudiantFiltre {
  const { query } = request;

  return {
    grandDomaineList: query.grandDomaine ? queryToArray(query.grandDomaine) : undefined,
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
  };
}
