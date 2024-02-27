export namespace Strapi {
	export interface SingleRelation<T> {
		data: Data<T> | null;
	}

	export interface CollectionRelation<T> {
		data: Data<T>[];
	}

	interface Response {
		meta: Meta;
	}

	export type SingleType<T> = { [Key in keyof SingleRelation<T>]: NonNullable<SingleRelation<T>[Key]> } & Response;
	export type CollectionType<T> = CollectionRelation<T> & Response;

	export interface Data<T> {
		attributes: T;
		id: number;
	}

	export interface Meta {
		pagination: Meta.Pagination;
	}

	namespace Meta {
		export interface Pagination {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		}
	}

	export interface Image {
		name: string;
		alternativeText?: string;
		caption: string;
		width: number;
		height: number;
		formats?: Image.Formats;
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

	export namespace Image {
		export interface Formats {
			large?: Formats.Format;
			medium?: Formats.Format;
			small?: Formats.Format;
			thumbnail?: Formats.Format;
		}

		export namespace Formats {
			export interface Format {
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
		}
	}

	export namespace SingleType {
	}

	export namespace CollectionType {
		export interface Article {
			titre: string;
			banniere: Strapi.SingleRelation<Strapi.Image>;
			slug: string;
			contenu: string;
		}

		export interface Entreprise {
			nom_societe: string
			code_postal: string
			ville: string
			siret: string
			taille: string
			secteur: string
			prenom: string
			telephone: string
			email: string
			nom: string
			travail: string
			erreur: string
		}
	}
}
