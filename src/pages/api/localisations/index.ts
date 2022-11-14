import type { NextApiRequest, NextApiResponse } from 'next';

import { Localisation, RechercheLocalisation } from '~/client/services/localisations/domain/localisation';
import { Commune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import {
  CommuneLocalisationApiResponse,
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/client/services/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherLocalisationHandler(req: NextApiRequest, res: NextApiResponse<RechercheLocalisationApiResponse | ErrorHttpResponse>) {
  const résultatsRechercheLocalisation = await dependencies.localisationDependencies.listeLocalisation
    .handle(rechercheLocalisationRequestMapper(req));
  switch (résultatsRechercheLocalisation.instance) {
    case 'success':
      return res.status(200).json(mapApiResponse(résultatsRechercheLocalisation.result));
    case 'failure':
      switch(résultatsRechercheLocalisation.errorType) {
        case ErreurMétier.SERVICE_INDISPONIBLE:
          return res.status(503).json({ error: résultatsRechercheLocalisation.errorType });
        case ErreurMétier.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultatsRechercheLocalisation.errorType });
        case ErreurMétier.CONTENU_INDISPONIBLE:
          return res.status(404).json({ error: résultatsRechercheLocalisation.errorType });
      }
  }
}

function mapLocalisation(localisationApiResponse: Localisation): LocalisationApiResponse {
  return {
    code: localisationApiResponse.code,
    libelle: `${localisationApiResponse.nom} (${localisationApiResponse.code})`,
    nom: localisationApiResponse.nom,
  };
}

function mapCommune(communeApiResponse: Commune): CommuneLocalisationApiResponse {
  return {
    code: communeApiResponse.code,
    codePostal: communeApiResponse.codePostal,
    libelle: communeApiResponse.libelle,
    nom: communeApiResponse.ville,
  };
}

export function mapApiResponse(localisationList: RechercheLocalisation): RechercheLocalisationApiResponse {
  const { communeList, départementList, régionList } = localisationList;

  const communeListApiResponse: CommuneLocalisationApiResponse[] = communeList.map(mapCommune);
  const départementListApiResponse: LocalisationApiResponse[] = départementList.slice(0,20).map(mapLocalisation);
  const régionListApiResponse: LocalisationApiResponse[] = régionList.slice(0,20).map(mapLocalisation);
  return { communeList: communeListApiResponse, départementList: départementListApiResponse, régionList: régionListApiResponse };
}
export default monitoringHandler(rechercherLocalisationHandler);

export function rechercheLocalisationRequestMapper(request: NextApiRequest): string {
  const { query } = request;

  return String(query.recherche);
}
