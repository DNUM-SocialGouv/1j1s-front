import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class ApiAdresseHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { API_ADRESSE_BASE_URL } = configurationService.getConfiguration();
    super('API_ADRESSE_BASE_URL', API_ADRESSE_BASE_URL);
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }
}
