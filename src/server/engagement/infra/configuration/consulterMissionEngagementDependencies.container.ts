import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { ConsulterMissionEngagementUseCase } from '~/server/engagement/useCases/consulterMissionEngagement.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface ConsulterMissionEngagementDependenciesContainer {
  readonly consulterMissionEngagement: ConsulterMissionEngagementUseCase;
};

export const consulterMissionEngagementDependenciesContainer = (
  httpClientService: HttpClientService,
): ConsulterMissionEngagementDependenciesContainer => {
  const missionEngagementRepository = new ApiEngagementRepository(httpClientService);

  return {
    consulterMissionEngagement: new ConsulterMissionEngagementUseCase(missionEngagementRepository),
  };
};
