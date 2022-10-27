import type { NextApiRequest, NextApiResponse } from 'next';

import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation, toArray } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function rechercherOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle(emploiFiltreMapper(req));
  return handleResponse(résultatsRechercheOffreEmploi, res);
}

export default monitoringHandler(rechercherOffreEmploiHandler);

export function emploiFiltreMapper(request: NextApiRequest): EmploiFiltre {
  const { query } = request;

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
