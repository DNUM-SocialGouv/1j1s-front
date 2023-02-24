import { DetailAlternance } from './DetailAlternance.type';

export function aDetailAlternance(override?: Partial<DetailAlternance>): DetailAlternance {
	return {
		description: 'description',
		entreprise: {
			localisation: 'paris',
		  nom: 'une entreprise',
		},
		niveauRequis: 'débutant',
		titre: 'un titre',
		typeDeContrat: 'apprentissage',
		...override,
	};
}
