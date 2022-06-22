import type { NextApiRequest, NextApiResponse } from 'next';

import { Localisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

// TODO : remove
export async function récupérerLocalisationAvecCodeInseeHandler(req: NextApiRequest, res: NextApiResponse<Localisation>) {
  const résultatRécupérationLocalisation = await dependencies.localisationDependencies.récupérerLocalisation.handle(
    String(req.query.typeLocalisation),
    String(req.query.codeInsee),
  );
  if(résultatRécupérationLocalisation) {
    const { code, nom } = résultatRécupérationLocalisation;
    return res.status(200).json({ code, nom });
  }
  return res.status(500);
}

export default monitoringHandler(récupérerLocalisationAvecCodeInseeHandler);
