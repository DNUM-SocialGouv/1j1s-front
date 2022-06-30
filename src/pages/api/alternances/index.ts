import { NextApiRequest, NextApiResponse } from 'next';

import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheAlternance | ErrorHttpResponse>) {
  const résultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance
    .handle(alternanceRequestMapper(req));
  return res.status(200).json(résultatsRechercheAlternance);
}

export default monitoringHandler(rechercherAlternanceHandler);

function alternanceRequestMapper(request: NextApiRequest): AlternanceFiltre {
  const { query } = request;

  return {
    codeLocalisation: query.codeLocalisation ? query.codeLocalisation.toString() : undefined,
    codeRomeList: query.codeRomes ? query.codeRomes.toString().split(',') : [],
    radius: query.radius ? query.radius.toString(): undefined,
  };
}
