import { anAxiosInstance } from '@tests/fixtures/httpClientService.fixture';

import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export function aLaBonneAlternanceHttpClient(): LaBonneAlternanceHttpClient {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as LaBonneAlternanceHttpClient;
}
