import {
	Mission,
	MissionEngagement,
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
import { handleGetFailureError } from '~/server/engagement/infra/repositories/apiEngagementError';
import { createSuccess, Either } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

const JE_VEUX_AIDER_PUBLISHER_ID = '5f5931496c7ea514150a818f';
const SERVICE_CIVIQUE_PUBLISHER_ID = '5f99dbe75eb1ad767733b206';

export class ApiEngagementRepository implements EngagementRepository {
	constructor(private httpClientService: PublicHttpClientService, private loggerService: LoggerService, private defaultErrorManagementService: ErrorManagementService) {}

	async getMissionEngagement(id: MissionId): Promise<Either<Mission>> {
		try {
			const response = await this.httpClientService.get<RésultatsMissionEngagementResponse>(
				`mission/${id}`,
			);
			return createSuccess(mapMission(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'engagement', this.loggerService);
		}
	}

	private async searchMissionEngagement(query: string) {
		try {
			const response = await this.httpClientService.get<RésultatsRechercheMissionEngagementResponse>(
				`mission/search?${query}`,
			);
			return createSuccess(mapRésultatsRechercheMission(response.data));
		} catch (e) {
			return this.defaultErrorManagementService.handleFailureError(e, {
				apiSource: 'API Engagement',
				contexte: 'recherche mission d’engagement',
				message: '[API Engagement] impossible d’effectuer une recherche',
			});
		}
	}

	async searchMissionServiceCivique(missionEngagementFiltre: MissionEngagement.Recherche.ServiceCivique): Promise<Either<RésultatsRechercheMission>> {
		const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre, SERVICE_CIVIQUE_PUBLISHER_ID);
		return this.searchMissionEngagement(paramètresRecherche);
	}

	async searchMissionBénévolat(missionEngagementFiltre: MissionEngagement.Recherche.Benevolat): Promise<Either<RésultatsRechercheMission>> {
		const paramètresRecherche = buildParamètresRechercheApiEngagement(missionEngagementFiltre, JE_VEUX_AIDER_PUBLISHER_ID);
		return this.searchMissionEngagement(paramètresRecherche);
	}
}
