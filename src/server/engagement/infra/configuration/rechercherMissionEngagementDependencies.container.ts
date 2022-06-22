import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { RechercherMissionEngagementUseCase } from '~/server/engagement/useCases/rechercherMissionEngagement.useCase';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

export interface RechercherMissionEngagementDependenciesContainer {
  readonly rechercherMissionEngagement: RechercherMissionEngagementUseCase;
}

export const rechercherMissionEngagementDependenciesContainer = (
  engagementHttpClientService: EngagementHttpClientService,
): RechercherMissionEngagementDependenciesContainer => {
  const missionEngagementRepository = new ApiEngagementRepository(engagementHttpClientService);

  return {
    rechercherMissionEngagement: new RechercherMissionEngagementUseCase(missionEngagementRepository),
  };
};
