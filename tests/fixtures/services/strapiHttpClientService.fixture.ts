import { anAxiosInstance } from '@tests/fixtures/services/httpClientService.fixture';

import { OldHttpClientService } from '../../../src/server/services/http/oldHttpClientService';

export function aStrapiHttpClientService(): OldHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as OldHttpClientService;
}
