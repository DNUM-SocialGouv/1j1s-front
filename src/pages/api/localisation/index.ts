import type { NextApiRequest, NextApiResponse } from 'next';

import { Localisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function récupérerLocalisationAvecCodeInseeHandler(req: NextApiRequest, res: NextApiResponse<Localisation>) {
  const résultatRécupérationLocalisation = await dependencies.localisationDependencies.récupererLocalisation.handle(String(req.query.typeLocalisation), String(req.query.codeInsee));
  return res.status(200).json(résultatRécupérationLocalisation);
}

export default monitoringHandler(récupérerLocalisationAvecCodeInseeHandler);
