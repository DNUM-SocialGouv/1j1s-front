import { ConfigurationService } from '~/server/services/configuration.service';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class StrapiCmsService {
  constructor(
    private strapiHttpClientService: StrapiHttpClientService,
    private configurationService: ConfigurationService,
  ) {
  }

  // TODO card simple

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
