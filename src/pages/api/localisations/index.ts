import type { NextApiRequest, NextApiResponse } from 'next';

import { Localisation, RechercheLocalisation } from '~/server/localisations/domain/localisation';
import {
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<RechercheLocalisationApiResponse>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  return res.status(200).json(mapApiResponse(résultatsRechercheLocalisation));
}

function mapLocalisation(localisationApiResponse: Localisation): LocalisationApiResponse {
  return {
    code: localisationApiResponse.code,
    libelle: `${localisationApiResponse.nom} (${localisationApiResponse.code})`,
    nom: localisationApiResponse.nom,
  };
}

export function mapApiResponse(localisationList: RechercheLocalisation): RechercheLocalisationApiResponse {
  const { communeList, départementList, régionList } = localisationList;

  const communeListApiResponse: LocalisationApiResponse[] = communeList.slice(0,20).map(mapLocalisation);
  const départementListApiResponse: LocalisationApiResponse[] = départementList.slice(0,20).map(mapLocalisation);
  const régionListApiResponse: LocalisationApiResponse[] = régionList.slice(0,20).map(mapLocalisation);
  return { communeList: communeListApiResponse, départementList: départementListApiResponse, régionList: régionListApiResponse };
}
export default monitoringHandler(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
