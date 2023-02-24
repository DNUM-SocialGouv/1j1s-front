import { MissionEngagement, RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { Either } from '~/server/errors/either';

export class RechercherMissionServiceCiviqueUseCase {
	constructor(private engagementRepository: EngagementRepository) {
	}

	async handle(rechercheServiceCivique: MissionEngagement.Recherche.ServiceCivique): Promise<Either<RésultatsRechercheMission>> {
		return this.engagementRepository.searchMissionServiceCivique(rechercheServiceCivique);
	}
}
