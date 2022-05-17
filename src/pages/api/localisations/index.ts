import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalisationList } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<LocalisationList>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  return res.status(200).json(sanitizeRéponse(résultatsRechercheLocalisation));
}

export function sanitizeRéponse(localisationList: LocalisationList): LocalisationList{
  const { communeList, départementList, régionList } = localisationList;
  return { communeList: communeList.slice(0,20), départementList: départementList.slice(0,20), régionList: régionList.slice(0,20) };
}
export default monitoringHandler(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
