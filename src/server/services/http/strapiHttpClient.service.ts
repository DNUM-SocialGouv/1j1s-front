import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class StrapiHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { STRAPI_URL_API, STRAPI_TOKEN_API } = configurationService.getConfiguration();
    super('STRAPI', STRAPI_URL_API, false, { Authorization: `Bearer ${STRAPI_TOKEN_API}` });
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
