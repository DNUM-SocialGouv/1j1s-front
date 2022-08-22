import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { ClientService } from '~/server/services/http/client.service';
import { PoleEmploiHttpClientConfig } from '~/server/services/http/httpClientConfig';
import { LoggerService } from '~/server/services/logger.service';

interface PoleEmploiTokenResponse {
  access_token: string;
  expires_in: number;
}

export class HttpClientServiceWithAuthentification extends ClientService {
  constructor(
    private poleEmploiHttpClientConfig: PoleEmploiHttpClientConfig,
  ){

    const API_NAME = poleEmploiHttpClientConfig.apiName;
    const API_URL = poleEmploiHttpClientConfig.apiUrl;
    const API_KEY = poleEmploiHttpClientConfig.apiKey;
    const overrideInterceptor = poleEmploiHttpClientConfig.overrideInterceptor;

    super(API_NAME, API_URL, overrideInterceptor, API_KEY ? { apiKey : API_KEY } : {} );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        LoggerService.error(`${API_NAME} ${error.response.status} ${error.config.baseURL}${error.config.url}`);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.isRetryRequest) {
          originalRequest.isRetryRequest = true;
          try {
            await this.refreshToken(poleEmploiHttpClientConfig);
          } catch (e) {
            LoggerService.error(`${API_NAME} ${error.response.status} ${error.config.baseURL}${error.config.url}`);
          }
          return await this.client.request(originalRequest);
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

  setAuthorizationHeader(token: string) {
    super.setAuthorizationHeader(token);
  }

  async refreshToken(poleEmploiHttpClientConfig: PoleEmploiHttpClientConfig): Promise<void> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', poleEmploiHttpClientConfig.clientId);
    params.append('client_secret', poleEmploiHttpClientConfig.clientSecret);
    params.append('scope', poleEmploiHttpClientConfig.connectScope);

    const endpoint = `${poleEmploiHttpClientConfig.connectUrl}/connexion/oauth2/access_token?realm=partenaire`;

    const response = await axios.post<PoleEmploiTokenResponse>(
      endpoint,
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    this.setAuthorizationHeader(response.data.access_token);
  }
}
