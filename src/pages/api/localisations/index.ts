import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { Localisation, RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<RechercheLocalisationApiResponse | ErrorHttpResponse>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  switch (résultatsRechercheLocalisation.instance) {
    case 'success':
      return res.status(200).json(mapApiResponse(résultatsRechercheLocalisation.result));
    case 'failure':
      return res.status(500);
  }
}

function mapLocalisation(localisationApiResponse: Localisation): LocalisationApiResponse {
  return {
    code: localisationApiResponse.code,
    libelle: `${localisationApiResponse.nom} (${localisationApiResponse.code})`,
    nom: localisationApiResponse.nom,
  };
}

function mapCommune(communeApiResponse: Commune): LocalisationApiResponse {
  return {
    code: communeApiResponse.code,
    libelle: communeApiResponse.libelle,
    nom: communeApiResponse.ville,
  };
}

export function mapApiResponse(localisationList: RechercheLocalisation): RechercheLocalisationApiResponse {
  const { communeList, départementList, régionList } = localisationList;

  const communeListApiResponse: LocalisationApiResponse[] = communeList.slice(0,20).map(mapCommune);
  const départementListApiResponse: LocalisationApiResponse[] = départementList.slice(0,20).map(mapLocalisation);
  const régionListApiResponse: LocalisationApiResponse[] = régionList.slice(0,20).map(mapLocalisation);
  return { communeList: communeListApiResponse, départementList: départementListApiResponse, régionList: régionListApiResponse };
}
export default monitoringHandler(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
