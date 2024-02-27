import {
	aStrapiArticle,
	aStrapiImage,
	aStrapiSingleRelation,
} from '../../cms/infra/repositories/strapi.fixture';
import { StrapiListeActualites } from './strapiActualites';

export function aStrapiListeActualites(override?: Partial<StrapiListeActualites.ListeActualites>): StrapiListeActualites.ListeActualites {
	return {
		listeActualites: [
			aStrapiActualite(),
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle()),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 2',
				titre: 'Titre 2',
				url: 'https://www.google.com',
			})],
		...override,
	};
}

export function aStrapiActualite(override?: Partial<StrapiListeActualites.Actualite>): StrapiListeActualites.Actualite {
	return {
		article: aStrapiSingleRelation(aStrapiArticle()),
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Contenu',
		titre: 'Titre',
		url: 'https://www.google.com',
		...override,
	};
}


