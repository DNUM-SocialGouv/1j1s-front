import type { NextApiRequest, NextApiResponse } from 'next';

import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation, toArray } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';
import Joi from 'joi';
import { validate } from '~/pages/api/middleware/validate'

const querySchema = Joi.object({
  motCle: Joi.string(),
  page: Joi.number().required(),
  tempsDeTravail: Joi.string().valid('tempsPlein', 'tempsPartiel', 'indifférent'),
  experienceExigence: Joi.string().valid('D', 'S', 'E'),
  typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
  libelleLocalisation: Joi.string(),
  codeLocalisation: Joi.number(),
  //grandDomaineList: Joi.string(), //Joi.array().items(Joi.string().valid('M', 'B', 'C', 'F', 'D', 'E', 'M14', 'M13', 'A', 'G', 'C15', 'H', 'M18', 'I', 'M17', 'M15', 'J', 'M16', 'K', 'L', 'L14', 'N')),
  typeDeContrats: Joi.string().pattern(new RegExp('(/(CDD|CDI|SAI|MIS),?)+/i')),//Joi.array().items(Joi.string().valid('CDD', 'CDI', 'SAI', 'MIS')),
})

export async function rechercherOffreEmploiHandler(
  req: NextApiRequest,
  res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  console.log('in rechercherOffreEmploiHandler')
  const params = emploiFiltreMapper(req);
  console.log('params', params)
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle(params);
  return handleResponse(résultatsRechercheOffreEmploi, res);
}

export default monitoringHandler(validate({ query: querySchema }, rechercherOffreEmploiHandler));

export function emploiFiltreMapper(request: NextApiRequest): EmploiFiltre {
  const { query } = request;
  console.log('query', query)

  return {
    experienceExigence: query.experienceExigence ? String(query.experienceExigence) : undefined,
    grandDomaineList: query.grandDomaine ? toArray(query.grandDomaine) : undefined,
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : undefined,
    page: Number(query.page),
    tempsDeTravail: query.tempsDeTravail ? String(query.tempsDeTravail) : undefined,
    typeDeContratList: query.typeDeContrats ? toArray(query.typeDeContrats) : undefined,
  };
}
