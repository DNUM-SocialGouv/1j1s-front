import { PoleEmploiHttpClientService } from "../../src/server/services/http/poleEmploiHttpClient.service";
import { anAxiosInstance } from "./httpClientService.fixture";

export function aPoleEmploiHttpClient(): PoleEmploiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as PoleEmploiHttpClientService;
}
