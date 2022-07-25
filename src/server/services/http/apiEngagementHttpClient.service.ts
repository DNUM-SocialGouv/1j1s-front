import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class EngagementHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_ENGAGEMENT_BASE_URL, API_ENGAGEMENT_API_KEY_TOKEN } = configurationService.getConfiguration();
    super('API_ENGAGEMENT', API_ENGAGEMENT_BASE_URL, false, { apikey : API_ENGAGEMENT_API_KEY_TOKEN });
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }
}
