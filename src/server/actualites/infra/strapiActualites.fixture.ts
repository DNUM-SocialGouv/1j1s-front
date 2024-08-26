import { aStrapiArticle } from '~/server/articles/infra/strapiArticle.fixture';

import {
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

export function aStrapiLongueListeActualites(override?: Partial<StrapiListeActualites.ListeActualites>): StrapiListeActualites.ListeActualites {
	return {
		listeActualites: [
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle({ slug: 'slug-1' })),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 1',
				titre: 'Titre 1',
				url: 'https://www.google.com',
			}),
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle(({ slug: 'slug-2' }))),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 2',
				titre: 'Titre 2',
				url: 'https://www.google.com',
			}),
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle(({ slug: 'slug-3' }))),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 3',
				titre: 'Titre 3',
				url: 'https://www.google.com',
			}),
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle(({ slug: 'slug-4' }))),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 4',
				titre: 'Titre 4',
				url: 'https://www.google.com',
			}),
			aStrapiActualite({
				article: aStrapiSingleRelation(aStrapiArticle(({ slug: 'slug-5' }))),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Contenu 5',
				titre: 'Titre 5',
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


