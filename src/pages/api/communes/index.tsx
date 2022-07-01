import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';


export async function rechercherCommuneHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheCommune | ErrorHttpResponse>) {
  const résultatRechercheCommunes = await dependencies.localisationDependencies.rechercherCommune.handle(String(req.query.q));
  switch (résultatRechercheCommunes.instance) {
    case 'success':
      return res.status(200).json(résultatRechercheCommunes.result);
    case 'failure':
      switch(résultatRechercheCommunes.errorType) {
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(500).json({ error: résultatRechercheCommunes.errorType });
        case ErrorType.ERREUR_INATTENDUE:
          return res.status(503).json({ error: résultatRechercheCommunes.errorType });
      }
  }
}

export default monitoringHandler(rechercherCommuneHandler);
