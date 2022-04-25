import { AxiosRequestConfig, AxiosResponse } from "axios";

import { ConfigurationService } from "~/server/services/configuration.service";
import { ClientService } from "~/server/services/http/client.service";

export class LaBonneAlternanceHttpClient extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_POLE_EMPLOI_BASE_URL } =
      configurationService.getConfiguration();
    super(API_POLE_EMPLOI_BASE_URL);
  }

  get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get(endpoint, config);
  }

  post<T>(
    resource: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post(resource, body, config);
  }
}
