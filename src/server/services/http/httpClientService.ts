import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClientConfig } from '~/server/services/http/httpClientConfig';

export class HttpClientService {
  readonly client: AxiosInstance;

  constructor (private clientConfig: HttpClientConfig) {
    const apiKey = clientConfig.apiKey;
    const url = clientConfig.apiUrl;
    this.client = axios.create({ baseURL: url, headers: apiKey ? { apiKey : apiKey } : {} });
  }

  async get<Response>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.client.get<Response>(endpoint, config);
  }

  async post<Body>(endpoint: string, body: Body) {
    return this.client.post(endpoint, body);
  }

  protected setAuthorizationHeader(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
