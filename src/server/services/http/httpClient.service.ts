import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ClientService } from '~/server/services/http/client.service';
import { HttpClientConfig } from '~/server/services/http/httpClientConfig';

export class HttpClientService extends ClientService {
  constructor(
    private agentService: HttpClientConfig,
  ){

    const label = agentService.apiName;
    const API_URL = agentService.apiUrl;
    const API_Key = agentService.apiKey;
    const overrideInterceptor = agentService.overrideInterceptor;

    super(label, API_URL, overrideInterceptor, API_Key ? { apiKey : API_Key } : {} );

  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }

  async post<Body>(endpoint: string, body: Body) {
    return this.client.post(endpoint, body);
  }
}
