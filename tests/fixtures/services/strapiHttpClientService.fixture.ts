import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { PageAccueilArticle } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export function aStrapiHttpClientService(): StrapiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as StrapiHttpClientService;
}
