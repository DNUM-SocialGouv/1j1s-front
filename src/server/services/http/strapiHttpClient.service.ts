import { AxiosRequestConfig, AxiosResponse } from "axios";

import { ConfigurationService } from "../configuration.service";
import { ClientService } from "./client.service";

export class StrapiHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { STRAPI_URL_API } = configurationService.getConfiguration();
    super(STRAPI_URL_API);
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
