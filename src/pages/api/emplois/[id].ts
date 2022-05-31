import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function consulterOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<OffreEmploi | ErrorHttpResponse >) {
  const id = req.query.id as string;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi
    .handle(id);
  switch (offreEmploi.instance) {
    case 'success' :
      return res.status(200).json(offreEmploi.result);
    case 'failure':
      switch(offreEmploi.errorType) {
        case ErrorType.CONTENU_INDISPONIBLE:
          return res.status(204).json({ error : offreEmploi.errorType });
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(500).json({ error : offreEmploi.errorType });
        case ErrorType.ERREUR_INATTENDUE:
          return res.status(503).json({ error : offreEmploi.errorType });
      }
  }
}

export default monitoringHandler(consulterOffreEmploiHandler);
