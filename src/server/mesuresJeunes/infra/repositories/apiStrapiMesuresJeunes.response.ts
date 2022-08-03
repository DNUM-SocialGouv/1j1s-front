export namespace Strapi {
  export type MesuresJeunesContentType = PublicationContentType<MesuresJeunesAttributes>

  export interface PublicationContentType<T> {
    data: Data<T>
    meta: Meta
  }

  export interface Data<T> {
    id: number
    attributes: T
  }

  export interface Meta {
    pagination: Pagination
  }

  export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }

  export interface ContentTypeAttributes {
    createdAt: string
    updatedAt: string
  }

  export interface PublicationContentTypeAttributes extends ContentTypeAttributes {
    publishedAt: string
  }

  export interface MesuresJeunesAttributes extends PublicationContentTypeAttributes {
    vieProfessionnelle: CarteMesuresJeunes[]
    orienterFormer: CarteMesuresJeunes[]
    accompagnement: CarteMesuresJeunes[]
    aidesFinancieres: CarteMesuresJeunes[]
  }

  export interface CarteMesuresJeunes {
    titre: string
    contenu: string
    url: string
    banniere: Image
  }

  export interface Image {
    data: Data<ImageAttributes>
  }

  export interface ImageAttributes extends ContentTypeAttributes {
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
