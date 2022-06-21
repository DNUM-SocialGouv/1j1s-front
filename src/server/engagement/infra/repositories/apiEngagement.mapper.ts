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
    const openToMinors = mission.openToMinors === 'true' ? 'dès 16 ans' : undefined;
    const city = mission.city || '';
    const postalCode = mission.postalCode ? `(${mission.postalCode})` : '';
    const location = city.length > 0 || postalCode.length > 0 ? `${city} ${postalCode}` : undefined;
    const étiquetteList = [openToMinors, location, mapDateDébutContrat(mission.startAt)].filter((tag: string |undefined) => tag !== undefined) as string[];

    return {
      description: mission.description,
      débutContrat: mapDateDébutContrat(mission.startAt),
      id: mission.id || mission.clientId,
      logo: mission.publisherLogo,
      nomEntreprise: mission.organizationName,
      titre: mission.title,
      étiquetteList,
    };
  });

}
