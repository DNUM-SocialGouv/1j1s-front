import { ApiGeoHttpClientService } from "../../src/server/services/http/apiGeoHttpClient.service";
import { anAxiosInstance } from "./httpClientService.fixture";

export function aApiGeoHttpClientService(): ApiGeoHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as ApiGeoHttpClientService;
}
