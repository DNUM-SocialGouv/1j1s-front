import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { PageAccueilArticle } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export function aStrapiHttpClientService(): StrapiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as StrapiHttpClientService;
}

export function aPageAccueilArticleListAxiosResponse(): AxiosResponse {
  return anAxiosResponse({
    'data': {
      'attributes': {
        'articles': [
          {
            'description': 'Un parcours entièrement personnalisé qui peut durer de 6 à 12 mois* en fonction de mon profil, pour m\'aider à définir mon projet professionnel et à trouver un emploi.',
            'id': 1,
            'image': {
              'data': {
                'attributes': {
                  'alternativeText': 'logo1j1s_france_relance_33a08b6529.svg',
                  'caption': 'logo1j1s_france_relance_33a08b6529.svg',
                  'createdAt': '2022-05-03T14:38:40.092Z',
                  'ext': '.svg',
                  'formats': null,
                  'hash': 'logo1j1s_france_relance_33a08b6529_461e6db5fe',
                  'height': null,
                  'mime': 'image/svg+xml',
                  'name': 'logo1j1s_france_relance_33a08b6529.svg',
                  'previewUrl': null,
                  'provider': 'local',
                  'provider_metadata': null,
                  'size': 18.42,
                  'updatedAt': '2022-05-03T14:38:40.092Z',
                  'url': '/uploads/logo1j1s_france_relance_33a08b6529_461e6db5fe.svg',
                  'width': null,
                },
                'id': 6,
              },
            },
            'lien': 'contrat-engagement-jeune',
            'titre': 'Je découvre le Contrat d\'Engagement Jeune',
          },
          {
            'description': 'Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc.',
            'id': 2,
            'image': {
              'data': {
                'attributes': {
                  'alternativeText': 'logo1j1s_france_relance_33a08b6529.svg',
                  'caption': 'logo1j1s_france_relance_33a08b6529.svg',
                  'createdAt': '2022-05-03T14:38:40.092Z',
                  'ext': '.svg',
                  'formats': null,
                  'hash': 'logo1j1s_france_relance_33a08b6529_461e6db5fe',
                  'height': null,
                  'mime': 'image/svg+xml',
                  'name': 'logo1j1s_france_relance_33a08b6529.svg',
                  'previewUrl': null,
                  'provider': 'local',
                  'provider_metadata': null,
                  'size': 18.42,
                  'updatedAt': '2022-05-03T14:38:40.092Z',
                  'url': '/uploads/logo1j1s_france_relance_33a08b6529_461e6db5fe.svg',
                  'width': null,
                },
                'id': 6,
              },
            },
            'lien': 'mes-aides',
            'titre': 'J’accède à mes aides financières',
          },
        ],
        'createdAt': '2022-04-12T13:43:44.068Z',
        'publishedAt': '2022-05-03T14:40:37.886Z',
        'updatedAt': '2022-05-03T14:40:37.889Z',
      },
      'id': 1,
    },
    'meta': {},
  });
}

export function aListOfArticleOnPageAccueil(): PageAccueilArticle[] {
  return [
    {
      description: 'Un parcours entièrement personnalisé qui peut durer de 6 à 12 mois* en fonction de mon profil, pour m\'aider à définir mon projet professionnel et à trouver un emploi.',
      image: {
        height: null,
        url: 'http://localhost:1337/uploads/logo1j1s_france_relance_33a08b6529_461e6db5fe.svg',
        width: null,
      },
      lien: 'http://localhost:3000/contrat-engagement-jeune',
      titre: 'Je découvre le Contrat d\'Engagement Jeune',
    },
    {
      description: 'Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc.',
      image: {
        height: null,
        url: 'http://localhost:1337/uploads/logo1j1s_france_relance_33a08b6529_461e6db5fe.svg',
        width: null,
      },
      lien: 'http://localhost:3000/mes-aides',
      titre: 'J’accède à mes aides financières',
    },
  ];
}
