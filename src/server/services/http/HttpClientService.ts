import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class HttpClientService {
  readonly client: AxiosInstance;

  protected constructor() {
    this.client = axios.create();
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
}
