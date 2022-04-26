import { aJobEtudiantList } from '@tests/fixtures/domain/jobEtudiant.fixture';
import { anOffreEmploiList } from '@tests/fixtures/domain/offreEmploi.fixture';
import {
  anAxiosInstance,
  anAxiosResponse,
} from '@tests/fixtures/services/httpClientService.fixture';
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

export function aRechercheOffreEmploiResponse(): AxiosResponse {
  return anAxiosResponse({
    resultats: anOffreEmploiList(),
  });
}

export function aRechercheJobEtudiantResponse(): AxiosResponse {
  return anAxiosResponse({
    resultats: aJobEtudiantList(),
  });
}
