import { Image } from '~/server/cms/domain/image';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export function flatMapSingleRelation<ReturnType>(relation: Strapi.SingleRelation<ReturnType>): ReturnType | undefined {
	const data = relation.data?.attributes;
	if (!data) {
		return undefined;
	}
	return data;
}


export function getExtraitContenu(contenu: string, size = 120): string {
	if (contenu.length < size) return contenu;
	const end = contenu.substring(size);
	const charactersLeft = end.indexOf(' ');
	const brief = contenu.substring(0, size + charactersLeft);
	return `${brief} …`;
}

export function flatMapSingleImage(response: Strapi.SingleRelation<Strapi.Image> | undefined): Image | undefined {
	if (!response?.data) {
		return undefined;
	}
	return {
		alt: response.data.attributes.alternativeText || '',
		src: response.data.attributes.url,
	};
}
