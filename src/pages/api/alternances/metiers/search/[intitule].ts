import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { dependencies } from '~/server/start';

async function handler (req: NextApiRequest, res: NextApiResponse<MétierRecherché[]>) {
  const { intitule } = req.query;
  const métierRecherchéList = await dependencies.metierRechercheDependencies.listeMétierRecherché
    .handle(intitule[0]);
  return res.status(200).json(métierRecherchéList);
};

export default withSentry(handler);
