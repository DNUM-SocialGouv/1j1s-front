import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { RechercherMissionEngagementUseCase } from '~/server/engagement/useCases/rechercherMissionEngagement.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface RechercherMissionEngagementDependenciesContainer {
  readonly rechercherMissionEngagement: RechercherMissionEngagementUseCase;
}

export const rechercherMissionEngagementDependenciesContainer = (
  httpClientService: HttpClientService,
): RechercherMissionEngagementDependenciesContainer => {
  const missionEngagementRepository = new ApiEngagementRepository(httpClientService);

  return {
    rechercherMissionEngagement: new RechercherMissionEngagementUseCase(missionEngagementRepository),
  };
};
