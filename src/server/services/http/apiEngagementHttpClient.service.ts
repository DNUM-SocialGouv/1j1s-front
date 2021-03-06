import {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class EngagementHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_ENGAGEMENT_BASE_URL, API_ENGAGEMENT_API_KEY_TOKEN } = configurationService.getConfiguration();
    super('API_ENGAGEMENT', API_ENGAGEMENT_BASE_URL, false, { apikey : API_ENGAGEMENT_API_KEY_TOKEN });
  }

  get<Response>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.client.get(endpoint, config);
  }

  post<Body, Response>(
    resource: string,
    body?: Body,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.client.post(resource, body, config);
  }
}
