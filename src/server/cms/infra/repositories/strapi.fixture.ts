import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export function aStrapiSingleRelation<T>(data: T): { [Key in keyof Strapi.SingleRelation<T>]: NonNullable<Strapi.SingleRelation<T>[Key]> } {
	return {
		data: {
			attributes: data,
			id: 1,
		},
	};
}

export function aStrapiCollectionRelation<T>(data: T[]): Strapi.CollectionRelation<T> {
	return {
		data: data.map((attribute: T, index: number) => ({
			attributes: attribute,
			id: index + 1,
		})),
	};
}

export function aStrapiSingleType<T>(data: T): Strapi.SingleType<T> {
	return {
		...aStrapiSingleRelation<T>(data),
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 25,
				total: 1,
			},
		},
	};
}

export function aStrapiCollectionType<T>(data: T[], meta?: Partial<Strapi.Meta>): Strapi.CollectionType<T> {
	return {
		...aStrapiCollectionRelation(data),
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 25,
				total: 1,
			},
			...meta,
		},
	};
}

export function aStrapiImage(override?: Partial<Strapi.Image>): Strapi.Image {
	return {
		alternativeText: 'text',
		caption: 'string',
		createdAt: 'string',
		ext: 'string',
		formats: {
			large: {
				ext: 'string',
				hash: 'string',
				height: 100,
				mime: 'string',
				name: 'string',
				path: 'string',
				size: 100,
				url: 'string',
				width: 100,
			},
		},
		hash: 'string',
		height: 100,
		mime: 'string',
		name: 'string',
		previewUrl: 'string',
		provider: 'string',
		provider_metadata: 'string',
		size: 100,
		updatedAt: 'string',
		url: 'https://animage.jpg',
		width: 100,
		...override,
	};
}

