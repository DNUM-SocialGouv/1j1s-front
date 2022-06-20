import type { NextApiRequest, NextApiResponse } from 'next';

import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { LocalisationApiResponse } from '~/server/localisations/infra/controllers/LocalisationListApiResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function récupérerLocalisationAvecCodeInseeHandler(req: NextApiRequest, res: NextApiResponse<LocalisationApiResponse>) {
  const résultatRécupérationLocalisation = await dependencies.localisationDependencies.récupérerLocalisation.handle(
    String(req.query.typeLocalisation),
    CodeInsee.createCodeInsee(String(req.query.codeInsee)),
  );
  if(résultatRécupérationLocalisation) {
    const { code, codeInsee, libelle } = résultatRécupérationLocalisation;
    return res.status(200).json({ code, codeInsee: codeInsee.value, libelle });
  }
  return res.status(500);
}

export default monitoringHandler(récupérerLocalisationAvecCodeInseeHandler);
