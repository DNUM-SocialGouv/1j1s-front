import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

export abstract class ClientService {
  readonly client: AxiosInstance;

  protected constructor(
    apiName: string,
    baseURL: string,
    overrideInterceptorsResponse = false,
    headers: AxiosRequestHeaders = {},
  ) {
    this.client = axios.create({
      baseURL,
      headers,
    });

    if(!overrideInterceptorsResponse) {
      this.client.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
          Sentry.captureMessage(`${apiName} ${error.response.status + ' ' + error.config.baseURL+error.config.url}`, CaptureContext.Severity.Error);
          return Promise.reject(error);
        },
      );
    }
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
