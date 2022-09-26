import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ClientService } from '~/server/services/http/client.service';
import { HttpClientConfig } from '~/server/services/http/httpClientConfig';

export class HttpClientService extends ClientService {
  constructor (private clientConfig: HttpClientConfig) {
    const label = clientConfig.apiName;
    const url = clientConfig.apiUrl;
    const apiKey = clientConfig.apiKey;
    const overrideInterceptor = clientConfig.overrideInterceptor;

    super(label, url, overrideInterceptor, apiKey ? { apiKey : apiKey } : {} );

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
