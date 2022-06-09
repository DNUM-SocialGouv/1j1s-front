import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class LaBonneAlternanceHttpClient extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_LA_BONNE_ALTERNANCE_BASE_URL } = configurationService.getConfiguration();
    super('API_LA_BONNE_ALTERNANCE', API_LA_BONNE_ALTERNANCE_BASE_URL);
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
