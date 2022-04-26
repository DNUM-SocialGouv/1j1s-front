import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

export abstract class ClientService {
  readonly client: AxiosInstance;

  protected constructor(baseURL: string, headers: AxiosRequestHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  abstract get<Response>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract post<Body, Response>(
    resource: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  protected setAuthorizationHeader(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
