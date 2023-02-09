import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export interface StrapiSingleTypeResponse<T> {
	data: DataResponse<T>
}

export interface StrapiCollectionTypeResponse<T> {
	data: DataResponse<T>[]
	meta: {
		pagination: StrapiCollectionPagination
	}
}

interface StrapiCollectionPagination {
	page: number
	pageSize: number
	pageCount: number
	total: number
}

export interface DataResponse<T> {
	attributes: T
	id: number
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
	banniere?: Strapi.Image
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
	pourQui: string
}
