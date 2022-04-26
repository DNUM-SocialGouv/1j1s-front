import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export function aLaBonneAlternanceHttpClient(): LaBonneAlternanceHttpClient {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as LaBonneAlternanceHttpClient;
}

export function aRechercheMétierResponse(): AxiosResponse {
  return anAxiosResponse({
    labelsAndRomes: [
      {
        label: 'Boucherie, charcuterie, traiteur',
        rncps: [
          'RNCP15078',
          'RNCP19184',
          'RNCP26612',
          'RNCP34311',
          'RNCP34375',
          'RNCP7067',
          'RNCP7069',
          'RNCP7580',
          'RNCP975',
        ],
        romes: ['D1103', 'D1101', 'H2101'],
        type: 'job',
      },
      {
        label: 'Boulangerie, pâtisserie, chocolaterie',
        rncps: [
          'RNCP13856',
          'RNCP1473',
          'RNCP9824',
          'RNCP5226',
          'RNCP588',
          'RNCP6900',
          'RNCP6901',
          'RNCP7068',
          'RNCP891',
          'RNCP9084',
        ],
        romes: ['D1102', 'D1104'],
        type: 'job',
      },
    ],
  });
};
