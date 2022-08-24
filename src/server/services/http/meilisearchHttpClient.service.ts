import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class MeilisearchHttpClientService {
  constructor(private configurationService: ConfigurationService) {
    const { NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY, NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL } = configurationService.getConfiguration();

    super('API_MEILISEARCH', NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL, false, { apiKey: NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY });
  }

  get<Response, Retour>(endpoint: string, mapper: (data: Response) => Retour, config?: AxiosRequestConfig): Promise<Either<Retour>> {
    return super.getRequest(endpoint, mapper, config);
  }
}
