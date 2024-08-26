import { Actualite } from '~/server/actualites/domain/actualite';
import { anArticle } from '~/server/articles/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';

export function anActualite(override?: Partial<Actualite>) {
	return {
		article: anArticle(),
		bannière: anImage(),
		contenu: 'Contenu',
		extraitContenu: 'Contenu',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Titre',
		...override,
	};
}

export function anActualiteList() {
	return [
		anActualite(),
		anActualite({
			article: anArticle(),
			bannière: anImage(),
			contenu: 'Contenu 2',
			extraitContenu: 'Contenu 2',
			link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
			titre: 'Titre 2',
		})];
}

export function anActualiteLongList() {
	return [
		anActualite({
			article: anArticle({ slug: 'slug-1' }),
			bannière: anImage(),
			contenu: 'Contenu 1',
			extraitContenu: 'Contenu 1',
			link: '/articles/slug-1',
			titre: 'Titre 1',
		}),
		anActualite({
			article: anArticle({ slug: 'slug-2' }),
			bannière: anImage(),
			contenu: 'Contenu 2',
			extraitContenu: 'Contenu 2',
			link: '/articles/slug-2',
			titre: 'Titre 2',
		}),
		anActualite({
			article: anArticle({ slug: 'slug-3' }),
			bannière: anImage(),
			contenu: 'Contenu 3',
			extraitContenu: 'Contenu 3',
			link: '/articles/slug-3',
			titre: 'Titre 3',
		}),
		anActualite({
			article: anArticle({ slug: 'slug-4' }),
			bannière: anImage(),
			contenu: 'Contenu 4',
			extraitContenu: 'Contenu 4',
			link: '/articles/slug-4',
			titre: 'Titre 4',
		}),
		anActualite({
			article: anArticle({ slug: 'slug-5' }),
			bannière: anImage(),
			contenu: 'Contenu 5',
			extraitContenu: 'Contenu 5',
			link: '/articles/slug-5',
			titre: 'Titre 5',
		}),
	];
}
