import { DataCmsResponse } from "~/server/services/cms/infra/repostitories/responses/cmsResponse";
import { BasePageAccueilArticleNamespace } from "~/server/services/cms/infra/repostitories/responses/pageAccueilCmsResponse.type";
import { StrapiContentType } from "~/server/services/cms/infra/repostitories/strapiContent.type";
import { ConfigurationService } from "~/server/services/configuration.service";
import { ClientService } from "~/server/services/http/client.service";

export class StrapiCmsService {
  constructor(
    private clientService: ClientService,
    private configurationService: ConfigurationService
  ) {}

  async getPageAccueilList(): Promise<PageAccueilArticle[]> {
    const { STRAPI_URL_API, STRAPI_URL_IMAGE } =
      this.configurationService.getConfiguration();
    const response = await this.clientService.get<
      DataCmsResponse<BasePageAccueilArticleNamespace.PageAccueilArticlesCmsResponse>
    >(
      STRAPI_URL_API +
        StrapiContentType.PAGE_ACCUEIL +
        this.constructApiStrapiForNestedContentType(
          StrapiContentType.PAGE_ACCUEIL_ARTICLES
        )
    );

    return response.data.data.attributes!.articles.map(
      (
        article: BasePageAccueilArticleNamespace.PageAccueilArticleCmsResponse
      ) => {
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
      }
    );
  }

  private constructApiStrapiForNestedContentType = (
    contentType: string
  ): string => `?populate[${contentType}][populate]=*`;
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
