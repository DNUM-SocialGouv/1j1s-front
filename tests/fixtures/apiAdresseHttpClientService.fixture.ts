import { ApiAdresseHttpClientService } from "../../src/server/services/http/apiAdresseHttpClient.service";
import { anAxiosInstance } from "./httpClientService.fixture";

export function aApiAdresseHttpClientService(): ApiAdresseHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as ApiAdresseHttpClientService;
}
