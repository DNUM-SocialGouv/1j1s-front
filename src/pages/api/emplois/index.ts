import type { NextApiRequest, NextApiResponse } from 'next';

import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { OffreEmploiFiltre, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function rechercherOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi>) {
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(offreEmploiRequestMapper(req));
  return res.status(200).json(résultatsRechercheOffreEmploi);
}

export default monitoringHandler(rechercherOffreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    motClé: String(query.motsCles),
    page: Number(query.page),
  };
}
