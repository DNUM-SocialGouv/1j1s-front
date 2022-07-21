import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientResponse, ClientService } from '~/server/services/http/client.service';

export class EngagementHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_ENGAGEMENT_BASE_URL, API_ENGAGEMENT_API_KEY_TOKEN } = configurationService.getConfiguration();
    super('API_ENGAGEMENT', API_ENGAGEMENT_BASE_URL, false, { apikey : API_ENGAGEMENT_API_KEY_TOKEN });
  }

  async get<Response>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<Either<ClientResponse<Response>>> {
    return super.getRequest(endpoint, config);
  }
}
