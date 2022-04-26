import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

interface PoleEmploiTokenResponse {
  access_token: string;
  expires_in: number;
}

export class PoleEmploiHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_POLE_EMPLOI_BASE_URL } = configurationService.getConfiguration();
    super(API_POLE_EMPLOI_BASE_URL);

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest.isRetryRequest) {
          originalRequest.isRetryRequest = true;
          try {
            await this.refreshToken();
          } catch (e) {
            // log error refresh token
          }
          return this.client.request(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  get<Response>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.client.get(endpoint, config);
  }

  post<Body, Response>(
    resource: string,
    body?: Body,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Response>> {
    return this.client.post(resource, body, config);
  }

  setAuthorizationHeader(token: string) {
    super.setAuthorizationHeader(token);
  }

  async refreshToken(): Promise<void> {
    const environmentVariables = this.configurationService.getConfiguration();
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', environmentVariables.API_POLE_EMPLOI_CLIENT_ID);
    params.append('client_secret', environmentVariables.API_POLE_EMPLOI_CLIENT_SECRET);
    params.append('scope', environmentVariables.API_POLE_EMPLOI_SCOPE);

    const endpoint = 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire';

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
