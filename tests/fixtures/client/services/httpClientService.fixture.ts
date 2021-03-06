import { HttpClientService } from '~/client/services/httpClient.service';

export function aHttpClientService(): HttpClientService {
  return {
    delete: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  } as unknown as HttpClientService;
}
