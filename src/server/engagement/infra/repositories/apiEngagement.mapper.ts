import {
  Mission,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import {
  MissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import { mapDateDébutContrat } from '~/server/utils/mapDateDébutContrat.mapper.utils';

export function mapRésultatsRechercheMission(response: RésultatsRechercheMissionEngagementResponse): RésultatsRechercheMission {
  return {
    nombreRésultats: response.total,
    résultats: mapMission(response.hits),
  };
}

function mapMission(missionList: Array<MissionEngagementResponse>): Array<Mission> {
  return missionList.map((mission: MissionEngagementResponse) => {
    return {
      description: mission.description,
      débutContrat: mapDateDébutContrat(mission.startAt),
      id: mission.id || mission.clientId,
      logo: mission.publisherLogo,
      nomEntreprise: mission.organizationName,
      titre: mission.title,
      étiquetteList: [],
    };
  });

}
