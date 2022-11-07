import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { Article } from '~/server/cms/domain/article';
import {
  ArticleAttributesResponse,
  StrapiCollectionTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';

export function anArticle(override?: Partial<Article>): Article {
  return {
    bannière: undefined,
    contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
      '\n' +
      'Lorem markdownum torumque sic latet',
    slug: 'mon-article',
    titre: 'Mon article',
	  ...override,
  };
}

export function anArticleResponse(override?: Partial<StrapiCollectionTypeResponse<ArticleAttributesResponse>>): StrapiCollectionTypeResponse<ArticleAttributesResponse> {
  return {
    data: [
      {
        attributes: {
          contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
					'\n' +
					'Lorem markdownum torumque sic latet',
	        slug: 'mon-article',
	        titre: 'Mon article',
        },
      },
    ],
    ...override,
  };
}

export function anArticleAxiosResponse(override?: Partial<StrapiCollectionTypeResponse<ArticleAttributesResponse>>): AxiosResponse<StrapiCollectionTypeResponse<ArticleAttributesResponse>> {
  return anAxiosResponse<StrapiCollectionTypeResponse<ArticleAttributesResponse>>(anArticleResponse(override));
}


