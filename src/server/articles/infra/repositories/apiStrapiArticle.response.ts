export interface ArticleResponse {
	data: Array<ArticleResponse.Data>,
	meta: ArticleResponse.Meta
}

export namespace ArticleResponse {
	export interface Data {
		id: string,
		attributes: Attributes
	}

	export interface Attributes {
		titre: string,
		slug: string,
		contenu: string,
		createdAt: string,
		updatedAt: string,
		publishedAt: string
	}

	export interface Meta {
		pagination: Pagination
	}

	export interface Pagination {
		page: number,
		pageSize: number,
		pageCount: number,
		total: number
	}
}
