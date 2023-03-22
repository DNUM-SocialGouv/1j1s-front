import { stringify } from 'querystring';

import { MissionEngagementQueryParams } from '~/client/hooks/useMissionEngagementQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export class MissionEngagementService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMission(query: MissionEngagementQueryParams, category: string): Promise<Either<RésultatsRechercheMission>> {
		const queryString = stringify(query);
		return this.httpClientService.get<RésultatsRechercheMission>(`${category === 'service-civique' ? 'services-civique' : 'benevolats'}?${queryString}`);
	}
}
