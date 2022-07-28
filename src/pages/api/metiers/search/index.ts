import { NextApiRequest, NextApiResponse } from 'next';

import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function handlerRechercheMétier(req: NextApiRequest, res: NextApiResponse<MétierRecherché[]>) {
  const { intitule } = req.query;
  const intituléMétier = (intitule as string).toLowerCase();
  const métierRecherchéList = await dependencies.alternanceDependencies.rechercherMétier
    .handle(intituléMétier);
  return res.status(200).json(métierRecherchéList);
}

export default monitoringHandler(handlerRechercheMétier);
