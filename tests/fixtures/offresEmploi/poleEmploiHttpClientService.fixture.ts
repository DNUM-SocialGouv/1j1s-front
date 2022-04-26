import {
  anAxiosInstance,
  anAxiosResponse,
} from '@tests/fixtures/httpClientService.fixture';
import { anOffreEmploiList } from '@tests/fixtures/offresEmploi/offreEmploi.fixture';
import { AxiosResponse } from 'axios';

import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export function aPoleEmploiHttpClient(): PoleEmploiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as PoleEmploiHttpClientService;
}

export function aPoleEmploiRechercheResponse(): AxiosResponse {
  return anAxiosResponse({
    resultats: anOffreEmploiList(),
  });
}
