import {
  RechercherMissionEngagementDependenciesContainer,
  rechercherMissionEngagementDependenciesContainer,
} from '~/server/engagement/infra/configuration/rechercherMissionEngagementDependencies.container';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

export type EngagementDependencies = RechercherMissionEngagementDependenciesContainer
export const engagementDependenciesContainer = (
  engagementHttpClientService: EngagementHttpClientService,
): EngagementDependencies => {
  return {
    ...rechercherMissionEngagementDependenciesContainer(engagementHttpClientService),
  };
};
