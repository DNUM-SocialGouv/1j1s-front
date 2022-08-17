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
    code: query.codeCommune ? query.codeCommune.toString() : undefined,
    codeRomeList: query.codeRomes?.toString().split(',') || [],
    latitude: query.latitudeCommune ? query.latitudeCommune.toString() : undefined,
    longitude: query.longitudeCommune ? query.longitudeCommune.toString() : undefined,
    radius: query.distanceCommune ? query.distanceCommune.toString(): undefined,
  };
}
