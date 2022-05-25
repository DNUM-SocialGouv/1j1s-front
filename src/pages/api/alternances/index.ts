import { NextApiRequest, NextApiResponse } from 'next';

import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { dependencies } from '~/server/start';

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheAlternance | ErrorHttpResponse>) {
  const résultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance
    .handle(alternanceRequestMapper(req));
  return res.status(200).json(résultatsRechercheAlternance);
}

function alternanceRequestMapper(request: NextApiRequest): AlternanceFiltre {
  const { query } = request;

  return {
    codeRomeList: query.codeRomes.toString().split(','),
  };
}
