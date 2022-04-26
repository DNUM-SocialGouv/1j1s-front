import { anAxiosInstance } from '@tests/fixtures/httpClientService.fixture';

import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export function aApiGeoHttpClientService(): ApiGeoHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as ApiGeoHttpClientService;
}
