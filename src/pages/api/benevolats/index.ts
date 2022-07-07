import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import {
  MissionEngagementFiltre,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

const OFFRE_PER_PAGE = 30;

export async function rechercherMissionHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheMission | ErrorHttpResponse>) {
  const résultatRechercherMission = await dependencies.engagementDependencies.rechercherMissionEngagement.handle(missionRequestMapper(req));
  switch (résultatRechercherMission.instance) {
    case 'success':
      return res.status(200).json(résultatRechercherMission.result);
    case 'failure':
      switch(résultatRechercherMission.errorType) {
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(500).json({ error: résultatRechercherMission.errorType });
        case ErrorType.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultatRechercherMission.errorType });
        case ErrorType.ERREUR_INATTENDUE:
          return res.status(503).json({ error: résultatRechercherMission.errorType });
      }
  }
}

export default monitoringHandler(rechercherMissionHandler);

function missionRequestMapper(request: NextApiRequest): MissionEngagementFiltre {
  const { query } = request;

  const JE_VEUX_AIDER_ID = '5f5931496c7ea514150a818f';
  return {
    distance: query.distanceCommune ? String(`${query.distanceCommune}km`) : undefined,
    domain: query.domain ? String(query.domain) : '',
    from: Number(query.page),
    lat: query.latitudeCommune ? Number(query.latitudeCommune) : undefined,
    lon: query.longitudeCommune ? Number(query.longitudeCommune) : undefined,
    publisher: JE_VEUX_AIDER_ID,
    size: OFFRE_PER_PAGE,
  };
}
