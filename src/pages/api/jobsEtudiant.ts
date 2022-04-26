import type { NextApiRequest, NextApiResponse } from 'next';

import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

async function handler (req: NextApiRequest, res: NextApiResponse<OffreEmploi[]>) {
  const jobEtudiantList = await dependencies.jobEtudiantDependencies.listeJobEtudiant
    .handle();
  return res.status(200).json(jobEtudiantList);
};

export default monitoringHandler(handler);
