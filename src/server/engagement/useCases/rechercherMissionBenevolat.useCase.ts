import {
	MissionEngagement,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { Either } from '~/server/errors/either';

export class RechercherMissionBénévolatUseCase {
	constructor(private engagementRepository: EngagementRepository) {
	}

	async handle(rechercheBénévolat: MissionEngagement.Recherche.Benevolat): Promise<Either<RésultatsRechercheMission>> {
		return this.engagementRepository.searchMissionBénévolat(rechercheBénévolat);
	}
}
