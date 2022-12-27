import { strapiImageFixture } from '~/server/cms/infra/repositories/strapi.fixture';
import {
  ActualiteAttributesResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';

import { CarteActualite } from './actualite';
import { anArticle } from './article.fixture';

export const aCarteActualiteFixture = (override?: Partial<CarteActualite>) => ({
  article: anArticle(),
  bannière: {
    alt: 'text',
    url: 'https://animage.jpg',
  },
  contenu: 'Contenu',
  extraitContenu: 'Contenu',
  link: '/articles/mon-article',
  titre: 'Titre',
  ...override,
});

export const aCartesActualitesListFixture = () => (
  [
    aCarteActualiteFixture({ titre: 'Actualité 1' }),
    aCarteActualiteFixture({ titre: 'Actualité 2' }),
    aCarteActualiteFixture({ titre: 'Actualité 3' }),
    aCarteActualiteFixture({ titre: 'Actualité 4' }),
    aCarteActualiteFixture({ titre: 'Actualité 5' }),
    aCarteActualiteFixture({ titre: 'Actualité 6' }),
    aCarteActualiteFixture({ titre: 'Actualité 7' }),
  ]
);

export const anActualiteFixture = (): StrapiSingleTypeResponse<ActualiteAttributesResponse> => ({
  data: {
    attributes: {
      listeActualites: [
        {
          article: {
            data: {
              attributes: {
                contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
                  '\n' +
                  'Lorem markdownum torumque sic latet',
                slug: 'mon-article',
                titre: 'Mon article',
              },
            },
          },
          banniere: strapiImageFixture(),
          contenu: 'Contenu',
          titre: 'Actualité 1',
          url: 'https://www.google.com',
        },
      ],
    },
  },
});
