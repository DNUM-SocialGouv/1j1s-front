import { HttpClientService } from '~/client/services/httpClient.service';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import { Either } from '~/server/errors/either';

export class MissionEngagementService {
  constructor(private httpClientService: HttpClientService) {}

  async rechercherMission(queryString: string, category: string): Promise<Either<RésultatsRechercheMission>> {
    return await this.httpClientService.get<RésultatsRechercheMission>(`${category === 'service-civique' ? 'services-civique' : 'benevolats'}?${queryString}`);
  }
}
