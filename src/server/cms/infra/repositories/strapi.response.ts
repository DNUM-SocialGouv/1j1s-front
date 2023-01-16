import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export interface StrapiSingleTypeResponse<T> {
    data: DataResponse<T>
}

export interface StrapiCollectionTypeResponse<T> {
    data: DataResponse<T>[]
}

interface DataResponse<T> {
    attributes: T
}

export interface StrapiImage {
    data: DataResponse<StrapiImageAttributes> | null
}

export interface StrapiImageAttributes {
    alternativeText?: string
    url: string
}

export interface ActualiteAttributesResponse {
    listeActualites: CarteActualiteResponse[]
}

export interface CarteActualiteResponse {
    titre: string
    contenu: string
    url: string
    banniere: Strapi.Image
    article: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>
}

export interface ArticleSimpleAttributesResponse {
    slug: string
    titre: string
    contenu: string
}

export interface ArticleAttributesResponse {
    titre: string
    banniere?: StrapiImage
    slug: string
    contenu: string
}

export interface EspaceJeuneAttributesResponse {
    vieProfessionnelle: CarteEspaceJeuneResponse[]
    orienterFormer: CarteEspaceJeuneResponse[]
    accompagnement: CarteEspaceJeuneResponse[]
    aidesFinancieres: CarteEspaceJeuneResponse[]
}

export interface CarteEspaceJeuneResponse {
    titre: string
    contenu: string
    url: string
    banniere: Strapi.Image
    article: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>
    pourQui: string
}

export interface MesuresEmployeursAttributesResponse {
    dispositifs: CarteMesuresEmployeursResponse[]
}

export interface CarteMesuresEmployeursResponse {
    titre: string
    contenu: string
    url: string
    banniere: Strapi.Image
    article: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>
    pourQui : string
}
