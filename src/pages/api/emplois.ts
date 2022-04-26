import type { NextApiRequest, NextApiResponse } from 'next';

import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  OffreEmploi,
  OffreEmploiFiltre,
} from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function offreEmploiHandler(req: NextApiRequest, res: NextApiResponse<OffreEmploi[]>) {
  const offreEmploiList =
    await dependencies.offreEmploiDependencies.listeOffreEmploi
      .handle(offreEmploiRequestMapper(req));
  return res.status(200).json(offreEmploiList);
}

export default monitoringHandler(offreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    motClé: String(query.motsCles),
    page: Number(query.page),
  };
}
