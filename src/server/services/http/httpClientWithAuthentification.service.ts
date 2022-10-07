import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { HttpClientWithAuthentificationConfig, TokenAgent } from '~/server/services/http/httpClientConfig';
import { LoggerService } from '~/server/services/logger.service';

import { HttpClientService } from './httpClient.service';

export class HttpClientServiceWithAuthentification extends HttpClientService {
  private tokenAgent: TokenAgent;
  private isRetry = false;
  private isRefreshingToken?: Promise<void>;

  constructor (private config: HttpClientWithAuthentificationConfig) {
    const { apiName, apiUrl } = config;
    super({ apiName, apiUrl, overrideInterceptor: true });
    this.tokenAgent = config.tokenAgent;

    this.client.interceptors.response.use(
      (r) => r,
      this.justInTimeAuthenticationInterceptor.bind(this),
    );
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }

  private async justInTimeAuthenticationInterceptor(error: AxiosResponse) {
    LoggerService.error(JSON.stringify(error));
    const { apiName } = this.config;
    if (axios.isAxiosError(error)) {
      LoggerService.error(`${apiName} ${error.response?.status} ${error.config.baseURL}${error.config.url}`);
      const originalRequest = error.config;

      const isAuthError = error.response?.status === 401 || error.response?.status === 403;

      if (isAuthError && !this.isRetry) {
        this.isRetry = true;
        try {
          await this.refreshToken();
        } catch (e) {
          if (axios.isAxiosError(e)) {
            LoggerService.error(`Error refreshing token ${apiName} ${e.response?.status} ${e.config.baseURL}${e.config.url}`);
          } else {
            LoggerService.error(`Error refreshing token ${apiName} ${e}`);
          }
          return Promise.reject(error);
        }
        const result = await this.client.request(originalRequest);
        this.isRetry = false;
        return result;
      }
    }
    return Promise.reject(error);
  }

  refreshToken(): Promise<void> {
    if (this.isRefreshingToken) {
      return this.isRefreshingToken;
    }
    return this.isRefreshingToken = this.tokenAgent.getToken()
      .then((token) => {
        this.setAuthorizationHeader(token);
      })
      .catch(() => {
        LoggerService.error('Error getToken');
      })
      .finally(() => {
        delete this.isRefreshingToken;
      });
  }
}
