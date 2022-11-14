import type { NextApiRequest, NextApiResponse } from 'next';

import { RésultatsRechercheCommune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';


export async function rechercherCommuneHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheCommune | ErrorHttpResponse>) {
  const résultatRechercheCommunes = await dependencies.localisationDependencies.rechercherCommune.handle(String(req.query.q));
  return handleResponse(résultatRechercheCommunes, res);
}

export default monitoringHandler(rechercherCommuneHandler);
