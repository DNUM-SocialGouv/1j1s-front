export interface DataCmsResponse<T> {
  data: AttributesCmsResponse<T>;
}

export interface AttributesCmsResponse<T> {
  attributes: Attributes<T>;
}

declare type Attributes<T> = T | null;

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
