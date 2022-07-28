import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class StrapiHttpClientService extends ClientService {
  constructor(private configurationService: ConfigurationService) {
    const { STRAPI_URL_API, STRAPI_TOKEN_API } = configurationService.getConfiguration();
    super('STRAPI', STRAPI_URL_API, false, { Authorization: `Bearer ${STRAPI_TOKEN_API}` });
  }

  async get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }
}
