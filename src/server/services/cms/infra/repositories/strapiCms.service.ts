import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class StrapiCmsService {
  constructor(
    private httpClientService: HttpClientService,
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
