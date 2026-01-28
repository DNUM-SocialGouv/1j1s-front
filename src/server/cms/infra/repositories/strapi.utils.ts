import { Image } from '~/server/cms/domain/image';
import { StrapiImage, StrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.response';

export function flatMapSingleRelation<ReturnType>(relation: StrapiSingleRelation<ReturnType>): ReturnType | undefined {
	const data = relation.data?.attributes;
	if (!data) {
		return undefined;
	}
	return data;
}

// FIXME (GAFI 14-11-2024): Une version plus safe existe avec la Regex /^.{size}\w*/ qui prend <size> caractères puis,
//	autant que nécessaire pour terminer le mot
//	Also, une seconde version existe pour la description des offres de logement qui prend en compte aussi un buffer de
//	taille minimum pour le reste du contenu (pour éviter d'avoir un bouton "voir plus" qui n'affiche qu'un seul mot de plus)
export function getExtraitContenu(contenu: string, size = 120): string {
	if (contenu.length < size) return contenu;
	const end = contenu.substring(size);
	const charactersLeft = end.indexOf(' ');
	const brief = contenu.substring(0, size + charactersLeft);
	return `${brief} …`;
}

export function flatMapSingleImage(response: StrapiSingleRelation<StrapiImage> | undefined): Image | undefined {
	if (!response?.data) {
		return undefined;
	}
	return {
		alt: response.data.attributes.alternativeText || '',
		src: response.data.attributes.url,
	};
}
