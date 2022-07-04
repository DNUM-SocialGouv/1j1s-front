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

  const SERVICE_CIVIQUE_ID = '5f99dbe75eb1ad767733b206';

  return {
    distance: query.distance ? Number(query.distance) : undefined,
    domain: query.domain ? String(query.domain) : '',
    from: Number(query.page),
    publisher: SERVICE_CIVIQUE_ID,
    size: OFFRE_PER_PAGE,
  };
}
