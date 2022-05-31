import { DataCmsResponse } from '~/server/services/cms/infra/repositories/responses/cmsResponse';
import { PageAccueilCmsResponse } from '~/server/services/cms/infra/repositories/responses/pageAccueilCmsResponse.type';
import { StrapiContentType } from '~/server/services/cms/infra/repositories/strapiContent.type';
import { ConfigurationService } from '~/server/services/configuration.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class StrapiCmsService {
  constructor(
    private strapiHttpClientService: StrapiHttpClientService,
    private configurationService: ConfigurationService,
  ) {
  }

  async getPageAccueilList(): Promise<PageAccueilArticle[]> {
    const { STRAPI_URL_API, STRAPI_BASE_URL, FRONT_URL } = this.configurationService.getConfiguration();
    const nestedContentTypeQueryParams = StrapiCmsService.buildNestedContentTypeQueryParams(
      StrapiContentType.PAGE_ACCUEIL_ARTICLES,
    );
    const response = await this.strapiHttpClientService.get<DataCmsResponse<PageAccueilCmsResponse>>(
      `${STRAPI_URL_API}${StrapiContentType.PAGE_ACCUEIL}${nestedContentTypeQueryParams}`,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.data.data.attributes.articles.map(
      (article: PageAccueilCmsResponse.ArticleCmsResponse) => {
        const { titre, description, lien } = article;
        const { width, height, url } = article.image.data.attributes;
        return {
          description,
          image: {
            height,
            url: `${STRAPI_BASE_URL}${url}`,
            width,
          },
          lien: `${FRONT_URL}${lien}`,
          titre,
        };
      },
    );
  }

  private static buildNestedContentTypeQueryParams(contentType: string): string {
    return `?populate[${contentType}][populate]=*`;
  }
}

export interface PageAccueilArticle {
  titre: string;
  description: string;
  image: PageAccueilArticleImage;
  lien: string;
}

export interface PageAccueilArticleImage {
  width: number | null;
  height: number | null;
  url: string;
}
