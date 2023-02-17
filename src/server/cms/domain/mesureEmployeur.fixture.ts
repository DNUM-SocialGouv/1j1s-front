import { anArticle } from '~/server/cms/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';

export function desMesuresEmployeurs(): MesureEmployeur[] {
	return [aMesureEmployeur()];
}

export function aMesureEmployeur(override?: Partial<MesureEmployeur>): MesureEmployeur {
	return {
		article: anArticle(),
		bannière: anImage(),
		contenu: 'Un beau contenu de carte',
		extraitContenu: 'Un beau contenu de carte',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
		titre: 'Un titre de carte',
		url: 'https://some.example.com/1',
		...override,
	};
}

export function aCartesMesuresEmployeursList(): MesureEmployeur[] {
	return [
		aMesureEmployeur(),
		{
			article: anArticle(),
			bannière: anImage(),
			contenu: 'Un deuxième beau contenu de carte',
			extraitContenu: 'Un deuxième beau contenu de carte',
			link: '/articles/slug-article',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un deuxième titre de carte',
			url: 'https://some.example.com/2',
		}, {
			article: anArticle(),
			bannière: anImage(),
			contenu: 'Un troisième beau contenu de carte',
			extraitContenu: 'Un troisième beau contenu de carte',
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un troisième titre de carte',
			url: 'https://some.example.com/3',
		}, {
			article: anArticle(),
			bannière: anImage(),
			contenu: 'Un quatrième beau contenu de carte',
			extraitContenu: 'Un quatrième beau contenu de carte',
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un quatrième titre de carte',
			url: 'https://some.example.com/4',
		},
	];
}
