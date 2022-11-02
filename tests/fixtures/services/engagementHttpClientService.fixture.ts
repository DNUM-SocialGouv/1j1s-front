import { anAxiosInstance } from '@tests/fixtures/services/httpClientService.fixture';

import { HttpClientService } from '~/server/services/http/httpClientService';

export function anEngagementHttpClientService(): HttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as HttpClientService;
}
