import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { ClientService } from '~/server/services/http/client.service';
import { HttpClientWithAuthentificationConfig, TokenAgent } from '~/server/services/http/httpClientConfig';
import { LoggerService } from '~/server/services/logger.service';

export class HttpClientServiceWithAuthentification extends ClientService {
  private tokenAgent: TokenAgent;
  private retries = new Set<object>();
  private isRefreshingToken?: Promise<void>;
  constructor (private config: HttpClientWithAuthentificationConfig) {
    const name = config.apiName;
    const url = config.apiUrl;
    const apiKey = config.apiKey;
    super(name, url, true, apiKey ? { apiKey : apiKey } : {} );
    this.tokenAgent = config.tokenAgent;

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (axios.isAxiosError(error)) {
          LoggerService.error(`${name} ${error.status} ${error.config.baseURL}${error.config.url}`);
          const originalRequest = error.config;

          if (error.response?.status == 401 && !this.retries.has(originalRequest)) {
            this.retries.add(originalRequest);
            try {
              await this.refreshToken();
            } catch (e) {
              this.retries.delete(originalRequest);
              LoggerService.error(`${name} ${error.response?.status} ${error.config.baseURL}${error.config.url}`);
              return Promise.reject(error);
            }
            const result = await this.client.request(originalRequest);
            this.retries.delete(originalRequest);
            return result;
          }
          this.retries.delete(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
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
