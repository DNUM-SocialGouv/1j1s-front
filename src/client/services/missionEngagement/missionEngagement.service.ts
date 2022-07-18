import axios from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import { TypeEngagement } from '~/client/utils/engagementsCategory.enum';
import { RésultatsRechercheMission } from '~/server/engagement/domain/engagement';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export class MissionEngagementService {
  constructor(private httpClientService: HttpClientService) {}

  async rechercherMission(queryString: string, category: string): Promise<Either<RésultatsRechercheMission>> {
    const resource = category === TypeEngagement.SERVICE_CIVIQUE ? TypeEngagement.SERVICE_CIVIQUE : TypeEngagement.BENEVOLAT;
    try {
      const response = await this.httpClientService.get<RésultatsRechercheMission>(`${resource}?${queryString}`);
      return createSuccess(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if(e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if(e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
