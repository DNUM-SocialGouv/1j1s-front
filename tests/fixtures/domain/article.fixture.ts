import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { Article } from '~/server/articles/domain/article';
import { ArticleResponse } from '~/server/articles/infra/repositories/apiStrapiArticle.response';

export function anArticle(override?: Partial<Article>): Article {
  return {
    contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
			'\n' +
			'Lorem markdownum torumque sic latet',
    slug: 'mon-article',
    titre: 'Mon article',
	  ...override,
  };
}

export function anArticleResponse(override?: Partial<ArticleResponse>): ArticleResponse {
  return {
    data: [{
      attributes: {
        contenu: '## Hic devia socero Latiaeque habe foedabis genetricis\n' +
					'\n' +
					'Lorem markdownum torumque sic latet',
        createdAt: '2022-06-02T15:49:22.086Z',
        publishedAt: '2022-06-02T15:49:50.642Z',
	      slug: 'mon-article',
	      titre: 'Mon article',
	      updatedAt: '2022-06-02T15:49:50.645Z',
      },
      id: '1234',
    }],
    meta: {
	    pagination: {
		    page: 1,
		    pageCount: 1,
		    pageSize: 25,
		    total: 1,
	    },
    },
    ...override,
  };
}

export function anArticleAxiosResponse(override?: Partial<ArticleResponse>): AxiosResponse<ArticleResponse> {
  return anAxiosResponse(anArticleResponse(override));
}


