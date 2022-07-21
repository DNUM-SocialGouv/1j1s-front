import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';
import { ClientResponse, ClientService } from '~/server/services/http/client.service';

describe('ClientService', () => {
  class FakeHttpClientService extends ClientService {

    async get<Response, Retour>(
      endpoint: string,
      mapper: (data: Response) => Retour,
      config?: AxiosRequestConfig,
    ): Promise<Either<ClientResponse<Retour>>> {
      return super.getRequest(endpoint, mapper, config);
    }
  }

  it('should', () => {
    
  });
});
