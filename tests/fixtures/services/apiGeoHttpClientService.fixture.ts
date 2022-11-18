import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

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
