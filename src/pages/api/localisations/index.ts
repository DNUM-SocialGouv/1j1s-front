import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalisationList } from '~/server/localisations/domain/localisation';
import {
  LocalisationApiResponse,
  LocalisationListApiResponse,
} from '~/server/localisations/infra/controllers/LocalisationListApiResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<LocalisationListApiResponse>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  return res.status(200).json(mapApiResponse(résultatsRechercheLocalisation));
}

export function mapApiResponse(localisationList: LocalisationList): LocalisationListApiResponse {
  const { communeList, départementList, régionList } = localisationList;
  const communeListApiResponse: LocalisationApiResponse[] = communeList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: codeInsee.value, libelle }));
  const départementListApiResponse: LocalisationApiResponse[] = départementList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: codeInsee.value, libelle }));
  const régionListApiResponse: LocalisationApiResponse[] = régionList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: codeInsee.value, libelle }));
  return { communeList: communeListApiResponse.slice(0,20), départementList: départementListApiResponse.slice(0,20), régionList: régionListApiResponse.slice(0,20) };
}
export default monitoringHandler(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
