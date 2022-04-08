export namespace BasePageAccueilArticleNamespace {
  export interface PageAccueilArticlesCmsResponse {
    articles: PageAccueilArticleCmsResponse[];
  }

  export interface PageAccueilArticleCmsResponse {
    titre: string;
    description: string;
    image: ImageCmsResponse;
    lien: string;
  }

  export interface ImageCmsResponse {
    data: DataImageCmsResponse;
  }

  export interface DataImageCmsResponse {
    attributes: AttributesImageCmsResponse;
  }

  export interface AttributesImageCmsResponse {
    width: number;
    height: number;
    url: string;
  }
}
