import { LaBonneAlternanceHttpClient } from "../../src/server/services/http/laBonneAlternanceHttpClient.service";
import { anAxiosInstance } from "./httpClientService.fixture";

export function aLaBonneAlternanceHttpClient(): LaBonneAlternanceHttpClient {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as LaBonneAlternanceHttpClient;
}
