import {
  ConsulterMissionEngagementDependenciesContainer,
  consulterMissionEngagementDependenciesContainer,
} from '~/server/engagement/infra/configuration/consulterMissionEngagementDependencies.container';
import {
  RechercherMissionEngagementDependenciesContainer,
  rechercherMissionEngagementDependenciesContainer,
} from '~/server/engagement/infra/configuration/rechercherMissionEngagementDependencies.container';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

export type EngagementDependencies =
    RechercherMissionEngagementDependenciesContainer
    & ConsulterMissionEngagementDependenciesContainer

export const engagementDependenciesContainer = (
  engagementHttpClientService: EngagementHttpClientService,
): EngagementDependencies => {
  return {
    ...consulterMissionEngagementDependenciesContainer(engagementHttpClientService),
    ...rechercherMissionEngagementDependenciesContainer(engagementHttpClientService),
  };
};
