import {
	Mission,
	MissionEngagementFiltre,
	MissionId,
	RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { buildParamètresRechercheApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.builder';
import { mapMission, mapRésultatsRechercheMission } from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import {
	RésultatsMissionEngagementResponse,
	RésultatsRechercheMissionEngagementResponse,
} from '~/server/engagement/infra/repositories/apiEngagement.response';
import {
	handleGetFailureError,
	handleSearchFailureError,
} from '~/server/engagement/infra/repositories/apiEngagementError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

const JE_VEUX_AIDER_PUBLISHER_ID = '5f5931496c7ea514150a818f';
const SERVICE_CIVIQUE_PUBLISHER_ID = '5f99dbe75eb1ad767733b206';

export class ApiEngagementRepository implements EngagementRepository {
	constructor(private httpClientService: HttpClientService) {}

	async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
		try {
			const response = await this.httpClientService.get<RésultatsMissionEngagementResponse>(
				`mission/${id}`,
			);
			return createSuccess(mapMission(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'engagement');
		}
	}

	private async searchMissionEngagement(query: string) {
		try {
			const response = await this.httpClientService.get<RésultatsRechercheMissionEngagementResponse>(
				`mission/search?${query}`,
			);
			return createSuccess(mapRésultatsRechercheMission(response.data));
		} catch (e) {
			return handleSearchFailureError(e);
		}
	}

	async searchMissionServiceCivique(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
		const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre, SERVICE_CIVIQUE_PUBLISHER_ID);
		return this.searchMissionEngagement(paramètresRecherche);
	}

	async searchMissionBénévolat(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
		const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre, JE_VEUX_AIDER_PUBLISHER_ID);
		return this.searchMissionEngagement(paramètresRecherche);
	}
}
