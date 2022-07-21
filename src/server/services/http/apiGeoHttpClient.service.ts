import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientResponse, ClientService } from '~/server/services/http/client.service';

export class ApiGeoHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_GEO_BASE_URL } = configurationService.getConfiguration();
    super('API_GEO_GOUV', API_GEO_BASE_URL);
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<ClientResponse<Retour>>> {
    return super.getRequest(endpoint, mapper, config);
  }
}
