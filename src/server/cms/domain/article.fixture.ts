import { Article } from './article';

export function anArticle(override?: Partial<Article>): Article {
	return {
		bannière: {
			alt: 'text',
			url: 'https://animage.jpg',
		},
		contenu: 'Contenu',
		slug: 'slug-titre',
		titre: 'Titre',
		...override,
	};
}
