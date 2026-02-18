export type StrapiSingleType<T> = { [Key in keyof StrapiSingleRelation<T>]: NonNullable<StrapiSingleRelation<T>[Key]> } & StrapiResponse;

export type StrapiCollectionType<T> = StrapiCollectionRelation<T> & StrapiResponse;

export interface StrapiSingleRelation<T> {
	data: StrapiData<T> | null;
}

export interface StrapiCollectionRelation<T> {
	data: StrapiData<T>[];
}

export interface StrapiData<T> {
	attributes: T;
	id: number;
}

interface StrapiResponse {
	meta: {
		pagination: StrapiPagination
	};
}

export interface StrapiPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface StrapiImage {
	name: string;
	alternativeText?: string;
	caption: string;
	width: number;
	height: number;
	formats?: StrapiImageFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string | null;
	provider_metadata: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface StrapiImageFormats {
	large?: StrapiImageFormatsFormat;
	medium?: StrapiImageFormatsFormat;
	small?: StrapiImageFormatsFormat;
	thumbnail?: StrapiImageFormatsFormat;
}

export interface StrapiImageFormatsFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
}
