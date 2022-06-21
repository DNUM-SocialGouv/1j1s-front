import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalisationApiResponse } from '~/server/localisations/infra/controllers/LocalisationListApiResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function récupérerLocalisationAvecCodeInseeHandler(req: NextApiRequest, res: NextApiResponse<LocalisationApiResponse>) {
  const résultatRécupérationLocalisation = await dependencies.localisationDependencies.récupérerLocalisation.handle(
    String(req.query.typeLocalisation),
    String(req.query.codeInsee),
  );
  if(résultatRécupérationLocalisation) {
    const { code, libelle } = résultatRécupérationLocalisation;
    return res.status(200).json({ code, libelle });
  }
  return res.status(500);
}

export default monitoringHandler(récupérerLocalisationAvecCodeInseeHandler);
