import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

export abstract class ClientService {
  readonly client: AxiosInstance;

  protected constructor(baseURL: string, headers: AxiosRequestHeaders = {}) {
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  abstract get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;

  abstract post<T>(
    resource: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>;

  protected setAuthorizationHeader(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
