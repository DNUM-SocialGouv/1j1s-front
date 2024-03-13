import { anImage } from '~/server/cms/domain/image.fixture';

import { MesureEmployeur } from './mesureEmployeur';

export function aMesureEmployeur(override?: Partial<MesureEmployeur>): MesureEmployeur {
	return {
		banniere: anImage(),
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
		titre: 'Un titre de carte',
		...override,
	};
}

export function aMesuresEmployeursList(): Array<MesureEmployeur> {
	return [
		aMesureEmployeur(),
		aMesureEmployeur({
			banniere: anImage(),
			link: '/articles/slug-article',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un deuxième titre de carte',
		}),
		aMesureEmployeur({
			banniere: anImage(),
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un troisième titre de carte',
		}),
		aMesureEmployeur({
			banniere: anImage(),
			link: '/articles/titre',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un quatrième titre de carte',
		}),
	];
}
