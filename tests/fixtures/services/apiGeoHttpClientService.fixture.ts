import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export function aApiGeoHttpClientService(): ApiGeoHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as ApiGeoHttpClientService;
}

export function aRechercheCommuneResponse(): AxiosResponse {
  return anAxiosResponse([
    {
      _score: 0.5387275638398817,
      code: '36048',
      codeDepartement: '36',
      codeRegion: '24',
      codesPostaux: ['36200'],
      nom: 'Chavin',
      population: 271,
    },
    {
      _score: 0.5387275638398817,
      code: '92022',
      codeDepartement: '92',
      codeRegion: '11',
      codesPostaux: ['92370'],
      nom: 'Chaville',
      population: 20771,
    },
  ]);
}

export function aRechercheDépartementResponse(): AxiosResponse {
  return anAxiosResponse([
    {
      _score: 1,
      code: '78',
      codeRegion: '11',
      nom: 'Yvelines',
    },
  ]);
}

export function aRechercheRégionResponse(): AxiosResponse {
  return anAxiosResponse([
    {
      _score: 0.6917635957182404,
      code: '32',
      nom: 'Hauts-de-France',
    },
  ]);
}
