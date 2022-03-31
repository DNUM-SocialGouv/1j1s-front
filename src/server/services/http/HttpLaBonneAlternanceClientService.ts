import { AxiosRequestConfig, AxiosResponse } from "axios";

import { HttpClientService } from "./HttpClientService";

export class HttpLaBonneAlternanceClientService extends HttpClientService {
  constructor() {
    super();
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
