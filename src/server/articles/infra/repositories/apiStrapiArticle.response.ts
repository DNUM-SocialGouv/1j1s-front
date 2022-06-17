export namespace Strapi {
	export type ArticleContentType = PublicationContentType<ArticleAttributes>

	export interface PublicationContentType<T> {
		data: Array<Data<T>>
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

	export interface ArticleAttributes extends PublicationContentTypeAttributes {
		titre: string
		image?: Image
		slug: string
		contenu?: string
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
