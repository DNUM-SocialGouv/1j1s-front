import {
  ConsulterMissionEngagementDependenciesContainer,
  consulterMissionEngagementDependenciesContainer,
} from '~/server/engagement/infra/configuration/consulterMissionEngagementDependencies.container';
import {
  RechercherMissionEngagementDependenciesContainer,
  rechercherMissionEngagementDependenciesContainer,
} from '~/server/engagement/infra/configuration/rechercherMissionEngagementDependencies.container';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export type EngagementDependencies =
    RechercherMissionEngagementDependenciesContainer
    & ConsulterMissionEngagementDependenciesContainer

export const engagementDependenciesContainer = (
  engagementHttpClientService: HttpClientService,
): EngagementDependencies => {
  return {
    ...consulterMissionEngagementDependenciesContainer(engagementHttpClientService),
    ...rechercherMissionEngagementDependenciesContainer(engagementHttpClientService),
  };
};
