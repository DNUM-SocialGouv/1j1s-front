export namespace Strapi {

  export interface CollectionType<T> {
    data: Data<T>[]
  }

  export interface SingleType<T> {
    data: Data<T>
  }

  export interface Data<T> {
    attributes: T
  }

  export interface Image {
    data: Data<ImageAttributes>
  }

  export interface ImageAttributes {
    name: string,
    alternativeText?: string,
    caption?: string,
    width: number,
    height: number,
    formats?: ImageFormatList,
    hash: string,
    ext: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: string,
    provider?: string,
    provider_metadata?: string,
    createdAt: string,
    updatedAt: string
  }

  export interface ImageFormatList {
    large?: ImageFormat,
    medium?: ImageFormat,
    small?: ImageFormat,
    thumbnail?: ImageFormat
  }

  export interface ImageFormat {
    ext: string,
    url: string,
    hash: string,
    mime: string,
    name: string,
    path: string,
    size: number,
    width: number
    height: number
  }
}

