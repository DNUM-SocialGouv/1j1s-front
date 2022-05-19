import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';
import { dependencies } from '~/server/start';

export async function consulterRéférentielDomaines(req: NextApiRequest, res: NextApiResponse<RéférentielDomaine[]>) {
  const résultatRéférentielDomaines = await dependencies.offreEmploiDependencies.consulterRéférentielDomaines.handle();
  return res.status(200).json(résultatRéférentielDomaines);
}

export default monitoringHandler(consulterRéférentielDomaines);
