import { anAxiosInstance } from '@tests/fixtures/services/httpClientService.fixture';

import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export function aStrapiHttpClientService(): HttpClientServiceWithAuthentification {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as HttpClientServiceWithAuthentification;
}
