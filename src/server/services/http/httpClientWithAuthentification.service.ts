import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { HttpClientWithAuthentificationConfig, TokenAgent } from '~/server/services/http/httpClientConfig';
import { LoggerService } from '~/server/services/logger.service';

import { OldHttpClientService } from './oldHttpClientService';

export class HttpClientServiceWithAuthentification extends OldHttpClientService {
  private tokenAgent: TokenAgent;
  private retries = new Set<object>();
  private isRefreshingToken?: Promise<void>;

  constructor (private config: HttpClientWithAuthentificationConfig) {
    const { apiName, apiUrl } = config;
    super({ apiName, apiUrl, overrideInterceptor: false });
    this.tokenAgent = config.tokenAgent;
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    const makeRequest = () => super.getRequest(endpoint, mapper, config, false);
    try {
      return await this.makeRequestWithRetry(makeRequest);
    } catch (e: unknown) {
      return this.mapError(endpoint, e);
    }
  }

  async post<Body>(
    endpoint: string,
    body: Body,
  ) {
    const makeRequest = () => super.post(endpoint, body);
    return this.makeRequestWithRetry(makeRequest);
  }

  private async makeRequestWithRetry<R> (makeRequest: () => Promise<R>): Promise<R> {
    try {
      return await makeRequest();
    } catch (error: unknown) {
      if (!this.shouldRetry(error)) { throw error; }
      try {
        await this.refreshToken();
      } catch (authError) {
        LoggerService.error(`${this.apiName} failed to refresh token ${authError}`);
        LoggerService.error(`${this.apiName} ${error.response?.status} ${error.config.baseURL}${error.config.url}`);
        throw error;
      }
      return makeRequest();
    }
  }

  private shouldRetry(error: unknown): error is AxiosError {
    if (!axios.isAxiosError(error)) {
      return false;
    }
    return error.response?.status === 401 || error.response?.status === 403;
  }

  refreshToken(): Promise<void> {
    if (this.isRefreshingToken) {
      return this.isRefreshingToken;
    }
    return this.isRefreshingToken = this.tokenAgent.getToken()
      .then((token) => {
        this.setAuthorizationHeader(token);
      })
      .finally(() => {
        delete this.isRefreshingToken;
      });
  }
}
