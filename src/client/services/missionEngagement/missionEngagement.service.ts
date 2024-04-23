import { MissionEngagementQueryParams } from '~/client/hooks/useMissionEngagementQuery';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export interface MissionEngagementService {
	rechercherMission(query: MissionEngagementQueryParams, category: string): Promise<Either<RésultatsRechercheMission>>
}
