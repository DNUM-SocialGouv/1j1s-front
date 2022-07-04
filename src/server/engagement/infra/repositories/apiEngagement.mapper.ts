import {
  Mission,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import {
  MissionEngagementResponse,
  RésultatMissionEngagementResponse,
  RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import { mapDateDébutContrat } from '~/server/utils/mapDateDébutContrat.mapper.utils';

export function mapRésultatsRechercheMission(response: RésultatsRechercheMissionEngagementResponse): RésultatsRechercheMission {
  return {
    nombreRésultats: response.total,
    résultats: mapMissions(response.hits),
  };
}

export function mapRésultatMission(response: RésultatMissionEngagementResponse): Mission {
  return mapMission(response.data);
}

export function mapMission(mission: MissionEngagementResponse): Mission {

  const accessibleAuxJeunes = mission.openToMinors === 'true' ? 'dès 16 ans' : undefined;
  const city = mission.city || '';
  const departmentName = mission.departmentName || '';
  const departmentCode = mission.departmentCode || '';
  const region = mission.region || '';
  const postalCode = mission.postalCode ? `(${mission.postalCode})` : '';
  const fullLocation = city.length > 0 || departmentCode.length > 0 || departmentName.length > 0 || region.length > 0 ? `${city} (${departmentCode} - ${departmentName} - ${region})`: undefined;
  const location = city.length > 0 || postalCode.length > 0 ? `${city} ${postalCode}` : undefined;
  const étiquetteList = [accessibleAuxJeunes, location, mapDateDébutContrat(mission.startAt)].filter((tag: string | undefined) => tag !== undefined) as string[];

  return {
    description: mission.description,
    duréeContrat: mission.duration,
    débutContrat: mapDateDébutContrat(mission.startAt),
    id: mission.id || mission.clientId,
    localisation: fullLocation,
    logo: mission.publisherLogo,
    nomEntreprise: mission.associationName || mission.organizationName,
    titre: mission.title,
    url: mission.applicationUrl,
    étiquetteList,
  };
};

export function mapMissions(missionList: Array<MissionEngagementResponse>): Array<Mission> {
  return missionList.map((mission: MissionEngagementResponse) => {

    const accessibleAuxJeunes = mission.openToMinors === 'true' ? 'dès 16 ans' : undefined;
    const city = mission.city || '';
    const departmentName = mission.departmentName || '';
    const departmentCode = mission.departmentCode || '';
    const region = mission.region || '';
    const postalCode = mission.postalCode ? `(${mission.postalCode})` : '';
    const fullLocation = city.length > 0 || departmentCode.length > 0 || departmentName.length > 0 || region.length > 0 ? `${city} (${departmentCode} - ${departmentName} - ${region})`: undefined;
    const location = city.length > 0 || postalCode.length > 0 ? `${city} ${postalCode}` : undefined;
    const étiquetteList = [accessibleAuxJeunes, location, mapDateDébutContrat(mission.startAt)].filter((tag: string | undefined) => tag !== undefined) as string[];

    return {
      description: mission.description,
      duréeContrat: mission.duration,
      débutContrat: mapDateDébutContrat(mission.startAt),
      id: mission.id || mission.clientId,
      localisation: fullLocation,
      logo: mission.publisherLogo,
      nomEntreprise: mission.associationName || mission.organizationName,
      titre: mission.title,
      url: mission.applicationUrl,
      étiquetteList,
    };
  });
};
