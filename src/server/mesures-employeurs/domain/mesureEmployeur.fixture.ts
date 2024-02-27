import { anArticle } from '~/server/cms/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';

import { MesureEmployeur } from './mesureEmployeur';

export function aMesureEmployeur(override?: Partial<MesureEmployeur>): MesureEmployeur {
	return {
		article: anArticle({
			slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		}),
		banniere: anImage(),
		contenu: 'Un beau contenu de carte',
		extraitContenu: 'Un beau contenu de carte',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
		titre: 'Un titre de carte',
		url: 'https://some.example.com/1',
		...override,
	};
}

export function aMesuresEmployeursList(): Array<MesureEmployeur> {
	return [
		aMesureEmployeur(),
		aMesureEmployeur({
			article: anArticle({ slug: 'slug-article' }),
			banniere: anImage(),
			contenu: 'Un deuxième beau contenu de carte',
			extraitContenu: 'Un deuxième beau contenu de carte',
			link: '/articles/slug-article',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un deuxième titre de carte',
			url: 'https://some.example.com/2',
		}),
		aMesureEmployeur({
			article: anArticle({ slug: 'titre' }),
			banniere: anImage(),
			contenu: 'Un troisième beau contenu de carte',
			extraitContenu: 'Un troisième beau contenu de carte',
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un troisième titre de carte',
			url: 'https://some.example.com/3',
		}),
		aMesureEmployeur({
			article: anArticle({ slug: 'titre' }),
			banniere: anImage(),
			contenu: 'Un quatrième beau contenu de carte',
			extraitContenu: 'Un quatrième beau contenu de carte',
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un quatrième titre de carte',
			url: 'https://some.example.com/4',
		}),
	];
}
