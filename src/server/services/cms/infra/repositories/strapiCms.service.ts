import { ConfigurationService } from '~/server/services/configuration.service';

import { OldHttpClientService } from '../../../http/oldHttpClientService';

export class StrapiCmsService {
  constructor(
    private httpClientService: OldHttpClientService,
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
