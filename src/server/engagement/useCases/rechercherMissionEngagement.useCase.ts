import {
  MissionEngagementFiltre,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { Either } from '~/server/errors/either';

export class RechercherMissionEngagementUseCase {
  constructor(private engagementRepository: EngagementRepository) {
  }

  async handle(missionServiceCiviqueFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    return await this.engagementRepository.searchMissionEngagement(missionServiceCiviqueFiltre);;
  }
}
