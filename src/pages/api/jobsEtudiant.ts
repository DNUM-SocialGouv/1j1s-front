import type { NextApiRequest, NextApiResponse } from 'next';

import { JobEtudiant } from '~/server/jobsEtudiant/domain/jobEtudiant';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

async function handler (req: NextApiRequest, res: NextApiResponse<JobEtudiant[]>) {
  const jobEtudiantList = await dependencies.jobEtudiantDependencies.listeJobEtudiant
    .handle();
  return res.status(200).json(jobEtudiantList);
};

export default monitoringHandler(handler);
