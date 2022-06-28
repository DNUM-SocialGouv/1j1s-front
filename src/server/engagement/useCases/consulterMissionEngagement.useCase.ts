import { Mission, MissionId } from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { Either } from '~/server/errors/either';

export class ConsulterMissionEngagementUseCase {
  constructor(private missionRepository: EngagementRepository) {
  }

  async handle(id: MissionId): Promise<Either<Mission>> {
    return await this.missionRepository.getMissionEngagement(id);
  }
}
