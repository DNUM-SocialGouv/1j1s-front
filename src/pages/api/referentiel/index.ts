import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';
import { dependencies } from '~/server/start';

export async function consulterRéférentielDomainesHandler(req: NextApiRequest, res: NextApiResponse<RéférentielDomaine[] | ErrorHttpResponse>) {
  const résultatRéférentielDomaines = await dependencies.offreEmploiDependencies.consulterRéférentielDomaines
    .handle();
  switch (résultatRéférentielDomaines.instance) {
    case 'success':
      return res.status(200).json(résultatRéférentielDomaines.result);
    case 'failure':
      if (résultatRéférentielDomaines.errorType === ErrorType.SERVICE_INDISPONIBLE) {
        return res.status(500).json({ error: résultatRéférentielDomaines.errorType });
      }
  }

}

export default monitoringHandler(consulterRéférentielDomainesHandler);
