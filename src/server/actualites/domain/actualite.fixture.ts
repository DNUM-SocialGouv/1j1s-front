import { Actualite } from '~/server/actualites/domain/actualite';
import { anArticle } from '~/server/articles/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';

export function anActualite(override?: Partial<Actualite>) {
	return {
		article: anArticle(),
		bannière: {
			alt: '',
			src: 'https://cos-njord-dgefp-1j1s-integ.storage-eb4.cegedim.cloud/strapi-medias/recrutement_apprentissage_10e5e2e702.png',
		},
		contenu: '👉Découvrez les structures disponibles pour vous accompagner et vous apporter les bonnes réponses selon votre situation.',
		extraitContenu: '👉Découvrez les structures disponibles pour vous accompagner et vous apporter les bonnes réponses selon votre …',
		link: '/articles/quelles-sont-les-structures-qui-peuvent-accompagner-les-jeunes',
		titre: 'Quelles sont les structures qui peuvent accompagner les jeunes ?',
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
