import type { NextApiRequest, NextApiResponse } from 'next';

import { JobÉtudiant } from '~/server/jobsÉtudiant/domain/jobÉtudiant';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

async function handler (req: NextApiRequest, res: NextApiResponse<JobÉtudiant[]>) {
  const jobÉtudiantList = await dependencies.jobÉtudiantDependencies.listeJobÉtudiant
    .handle();
  return res.status(200).json(jobÉtudiantList);
};

export default monitoringHandler(handler);
