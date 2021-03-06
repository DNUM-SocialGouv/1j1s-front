import { NextApiRequest, NextApiResponse } from 'next';

import { AlternanceFiltre, R├ęsultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherAlternanceHandler(req: NextApiRequest, res: NextApiResponse<R├ęsultatsRechercheAlternance | ErrorHttpResponse>) {
  const r├ęsultatsRechercheAlternance = await dependencies.alternanceDependencies.rechercherAlternance
    .handle(alternanceRequestMapper(req));
  return res.status(200).json(r├ęsultatsRechercheAlternance);
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
