import { anAxiosInstance } from '@tests/fixtures/services/httpClientService.fixture';

import { HttpClientService } from '~/server/services/http/httpClientService';

export function aStrapiHttpClientService(): HttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as HttpClientService;
}
