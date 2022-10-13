import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';
import { LoggerService } from '~/server/services/logger.service';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export class HttpClientServiceWithAuthentificationPoleEmploi extends ClientService {
  constructor(
    private configurationService: ConfigurationService,
    private apiUrl: string,
  ){

    const API_NAME = 'API_POLE_EMPLOI';


    super(API_NAME, apiUrl, true);

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        LoggerService.error(`${API_NAME} ${error.response.status} ${error.config.baseURL}${error.config.url}`);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.isRetryRequest) {
          originalRequest.isRetryRequest = true;
          try {
            await this.refreshToken(configurationService);
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

  async refreshToken(configurationService: ConfigurationService): Promise<void> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID);
    params.append('client_secret', configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET);
    params.append('scope', configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE);

    const endpoint = `${configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`;

    const response = await axios.post<TokenResponse>(
      endpoint,
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    this.setAuthorizationHeader(response.data.access_token);
  }
}
