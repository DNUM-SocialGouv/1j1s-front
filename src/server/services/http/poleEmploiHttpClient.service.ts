import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

import { LoggerService } from '../logger.service';

interface PoleEmploiTokenResponse {
  access_token: string;
  expires_in: number;
}

export class PoleEmploiHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_POLE_EMPLOI_BASE_URL } = configurationService.getConfiguration();
    super('API_POLE_EMPLOI', API_POLE_EMPLOI_BASE_URL, true);

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        LoggerService.error(`API_POLE_EMPLOI ${error.response.status + ' ' + error.config.baseURL+error.config.url}`);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.isRetryRequest) {
          originalRequest.isRetryRequest = true;
          try {
            await this.refreshToken();
          } catch (e) {
            console.error(e);
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

  async refreshToken(): Promise<void> {
    const environmentVariables = this.configurationService.getConfiguration();
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', environmentVariables.POLE_EMPLOI_CONNECT_CLIENT_ID);
    params.append('client_secret', environmentVariables.POLE_EMPLOI_CONNECT_CLIENT_SECRET);
    params.append('scope', environmentVariables.POLE_EMPLOI_CONNECT_SCOPE);

    const endpoint = `${environmentVariables.POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`;

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
