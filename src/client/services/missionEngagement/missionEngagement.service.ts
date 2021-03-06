import axios from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import { EngagementCategory } from '~/client/utils/engagementsCategory.enum';
import { R├ęsultatsRechercheMission } from '~/server/engagement/domain/engagement';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export class MissionEngagementService {
  constructor(private httpClientService: HttpClientService) {}

  async rechercherMission(queryString: string, category: string): Promise<Either<R├ęsultatsRechercheMission>> {
    const resource = category === EngagementCategory.SERVICE_CIVIQUE ? 'services-civique' : 'benevolats';
    try {
      const response = await this.httpClientService.get<R├ęsultatsRechercheMission>(`${resource}?${queryString}`);
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
