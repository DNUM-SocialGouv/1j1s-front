import { anAxiosInstance } from "@tests/fixtures/httpClientService.fixture";

import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";

export function aPoleEmploiHttpClient(): PoleEmploiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as PoleEmploiHttpClientService;
}
