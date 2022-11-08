import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { HttpClientService } from '~/server/services/http/httpClientService';

export function aApiGeoHttpClientService(): HttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as HttpClientService;
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

export function aRechercheCommuneResponseAvecPlusieursCodePostaux(): AxiosResponse {
  return anAxiosResponse([
    {
      _score: 0.3835418052804487,
      code: '81202',
      codeDepartement: '81',
      codeRegion: '76',
      codesPostaux: [
        '81310',
      ],
      nom: 'Parisot',
      population: 960,
    },
    {
      _score: 0.4327093153684474,
      code: '75056',
      codeDepartement: '75',
      codeRegion: '11',
      codesPostaux: [
        '75001',
        '75002',
        '75003',
        '75004',
        '75005',
        '75006',
        '75007',
        '75008',
        '75009',
        '75010',
        '75011',
        '75012',
        '75013',
        '75014',
        '75015',
        '75116',
        '75016',
        '75017',
        '75018',
        '75019',
        '75020',
      ],
      nom: 'Paris',
      population: 2165423,
    },
  ]);
}

export function aCommuneResponseAvecPlusieursCodePostaux(): AxiosResponse {
  return anAxiosResponse({
    code: '75056',
    codeDepartement: '75',
    codeRegion: '11',
    codesPostaux: [
      '75001',
      '75002',
      '75003',
      '75004',
      '75005',
      '75006',
      '75007',
      '75008',
      '75009',
      '75010',
      '75011',
      '75012',
      '75013',
      '75014',
      '75015',
      '75116',
      '75016',
      '75017',
      '75018',
      '75019',
      '75020',
    ],
    nom: 'Paris',
    population: 2165423,
  });
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

export function aRécupérationCommuneResponse(): AxiosResponse {
  return anAxiosResponse({
    code: '36048',
    codeDepartement: '36',
    codeRegion: '24',
    codesPostaux: ['36200'],
    nom: 'Chavin',
    population: 271,
  },
  );
}

export function aRécupérationDépartementResponse(): AxiosResponse {
  return anAxiosResponse({
    code: '78',
    codeRegion: '11',
    nom: 'Yvelines',
  },
  );
}

export function aRécupérationRégionResponse(): AxiosResponse {
  return anAxiosResponse({
    code: '32',
    nom: 'Hauts-de-France',
  },
  );
}
