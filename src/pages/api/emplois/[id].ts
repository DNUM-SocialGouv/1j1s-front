import type { NextApiRequest, NextApiResponse } from 'next';

import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function consulterOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<OffreEmploi>) {
  const id = req.query.id as string;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi
    .handle(id);
  return res.status(200).json(offreEmploi);
}

export default monitoringHandler(consulterOffreEmploiHandler);
