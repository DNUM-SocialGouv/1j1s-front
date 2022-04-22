import { AxiosRequestConfig, AxiosResponse } from "axios";

import { ConfigurationService } from "../configuration.service";
import { ClientService } from "./client.service";

export class ApiGeoHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_GEO_BASE_URL } = configurationService.getConfiguration();
    super(API_GEO_BASE_URL);
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
