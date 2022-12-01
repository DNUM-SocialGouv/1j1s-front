import { AxiosResponse } from 'axios';

import {
  ArticleAttributesResponse,
  StrapiCollectionTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

import { Article } from './article';

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


