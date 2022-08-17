import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { PoleEmploiHttpClientConfig } from '~/server/services/http/agentHttpClient';
import { ClientService } from '~/server/services/http/client.service';
import { LoggerService } from '~/server/services/logger.service';

interface PoleEmploiTokenResponse {
  access_token: string;
  expires_in: number;
}

export class HttpClientServiceWithAuthentification extends ClientService {
  constructor(
    private agentService: PoleEmploiHttpClientConfig,
  ){

    const API_NAME = agentService.apiName;
    const API_URL = agentService.apiUrl;
    const API_KEY = agentService.apiKey;
    const overrideInterceptor = agentService.overrideInterceptor;

    super(API_NAME, API_URL, overrideInterceptor, API_KEY ? { apiKey : API_KEY } : {} );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        LoggerService.error(`${API_NAME} ${error.response.status} ${error.config.baseURL}${error.config.url}`);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.isRetryRequest) {
          originalRequest.isRetryRequest = true;
          try {
            await this.refreshToken(agentService);
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

  async refreshToken(agentService: PoleEmploiHttpClientConfig): Promise<void> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', agentService.clientId);
    params.append('client_secret', agentService.clientSecret);
    params.append('scope', agentService.connectScope);

    const endpoint = `${agentService.connectUrl}/connexion/oauth2/access_token?realm=partenaire`;

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
