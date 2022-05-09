import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalisationList } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<LocalisationList>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  return res.status(200).json(résultatsRechercheLocalisation);
}

export default monitoringHandler(rechercherLocalisationHandler);

function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
