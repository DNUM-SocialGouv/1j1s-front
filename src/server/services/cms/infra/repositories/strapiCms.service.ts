import { DataCmsResponse } from '~/server/services/cms/infra/repositories/responses/cmsResponse';
import { PageAccueilCmsResponse } from '~/server/services/cms/infra/repositories/responses/pageAccueilCmsResponse.type';
import { StrapiContentType } from '~/server/services/cms/infra/repositories/strapiContent.type';
import { ConfigurationService } from '~/server/services/configuration.service';
import { ClientService } from '~/server/services/http/client.service';

export class StrapiCmsService {
  constructor(
    private clientService: ClientService,
    private configurationService: ConfigurationService,
  ) {}

  async getPageAccueilList(): Promise<PageAccueilArticle[]> {
    const { STRAPI_URL_API, STRAPI_URL_IMAGE } =
      this.configurationService.getConfiguration();
    const response = await this.clientService.get<
      DataCmsResponse<PageAccueilCmsResponse>
    >(
      STRAPI_URL_API +
        StrapiContentType.PAGE_ACCUEIL +
        StrapiCmsService.buildApiStrapiForNestedContentTypeQueryParams(
          StrapiContentType.PAGE_ACCUEIL_ARTICLES,
        ),
    );

    return response.data.data.attributes!.articles.map(
      (article: PageAccueilCmsResponse.ArticleCmsResponse) => {
        const { titre, description, lien } = article;
        const { width, height, url } = article.image.data.attributes;
        return {
          description,
          image: {
            height,
            url: `${STRAPI_URL_IMAGE + url}`,
            width,
          },
          lien,
          titre,
        };
      },
    );
  }

  private static buildApiStrapiForNestedContentTypeQueryParams(
    contentType: string,
  ): string {
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
  width: number;
  height: number;
  url: string;
}
