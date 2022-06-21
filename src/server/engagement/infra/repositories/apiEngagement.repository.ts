import axios from 'axios';

import {
  MissionEngagementFiltre,
  RésultatsRechercheMission,
} from '~/server/engagement/domain/engagement';
import { EngagementRepository } from '~/server/engagement/domain/engagement.repository';
import { mapRésultatsRechercheMission } from '~/server/engagement/infra/repositories/apiEngagement.mapper';
import { RésultatsRechercheMissionEngagementResponse } from '~/server/engagement/infra/repositories/apiEngagement.response';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { EngagementHttpClientService } from '~/server/services/http/apiEngagementHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiEngagementRepository implements EngagementRepository {
  constructor(private engagementHttpClientService: EngagementHttpClientService) {
  }

  async searchMissionEngagement(missionEngagementFiltre: MissionEngagementFiltre): Promise<Either<RésultatsRechercheMission>> {
    const paramètresRecherche = this.buildParamètresRecherche(missionEngagementFiltre);

    try {
      const response = await this.engagementHttpClientService.get<RésultatsRechercheMissionEngagementResponse>(`mission/search?${paramètresRecherche}`);
      return createSuccess(mapRésultatsRechercheMission(response.data));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if (e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  buildParamètresRecherche(missionEngagementFiltre: MissionEngagementFiltre): string {
    const { from, domain, publisher, size } = missionEngagementFiltre;
    // eslint-disable-next-line
    const queryList: Record<string, any > = {
      domain,
      from,
      publisher,
      size,
    };
    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }
}
