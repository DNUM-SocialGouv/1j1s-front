import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { OffreFiltre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const résultatsRechercheAlternance = await dependencies.offreAlternanceDependencies.rechercherOffreAlternance.handle(alternanceFiltreMapper(req));
  return handleResponse(résultatsRechercheAlternance, res);
}

export default monitoringHandler(rechercherAlternanceHandler);

export function alternanceFiltreMapper(request: NextApiRequest): OffreFiltre {
  const { query } = request;
  return {
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
  };
}
