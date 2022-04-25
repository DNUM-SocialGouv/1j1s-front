import { anAxiosInstance } from "@tests/fixtures/httpClientService.fixture";

import { ApiAdresseHttpClientService } from "~/server/services/http/apiAdresseHttpClient.service";

export function aApiAdresseHttpClientService(): ApiAdresseHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as ApiAdresseHttpClientService;
}
