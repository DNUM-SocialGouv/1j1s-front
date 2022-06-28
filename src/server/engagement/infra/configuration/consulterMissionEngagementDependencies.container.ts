import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { ConsulterMissionEngagementUseCase } from '~/server/engagement/useCases/consulterMissionEngagement.useCase';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';

export interface ConsulterMissionEngagementDependenciesContainer {
  readonly consulterMissionEngagement: ConsulterMissionEngagementUseCase;
};

export const consulterMissionEngagementDependenciesContainer = (
  engagementHttpClientService: EngagementHttpClientService,
): ConsulterMissionEngagementDependenciesContainer => {
  const missionEngagementRepository = new ApiEngagementRepository(engagementHttpClientService);

  return {
    consulterMissionEngagement: new ConsulterMissionEngagementUseCase(missionEngagementRepository),
  };
};
