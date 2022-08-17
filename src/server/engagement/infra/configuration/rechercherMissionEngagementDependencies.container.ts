import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { RechercherMissionEngagementUseCase } from '~/server/engagement/useCases/rechercherMissionEngagement.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherMissionEngagementDependenciesContainer {
  readonly rechercherMissionEngagement: RechercherMissionEngagementUseCase;
}

export const rechercherMissionEngagementDependenciesContainer = (
  engagementHttpClientService: HttpClientService,
): RechercherMissionEngagementDependenciesContainer => {
  const missionEngagementRepository = new ApiEngagementRepository(engagementHttpClientService);

  return {
    rechercherMissionEngagement: new RechercherMissionEngagementUseCase(missionEngagementRepository),
  };
};
