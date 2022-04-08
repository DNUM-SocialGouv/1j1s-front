export interface DataCmsResponse<T> {
  data: AttributesCmsResponse<T>;
}

export interface AttributesCmsResponse<T> {
  attributes: Attributes<T>;
}

declare type Attributes<T> = T | null;
