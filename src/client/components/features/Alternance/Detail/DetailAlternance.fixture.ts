import { DetailAlternance } from './DetailAlternance.type';

export function aDetailAlternance(override?: Partial<DetailAlternance>): DetailAlternance {
	return {
		description: 'description',
		entreprise: {
		  nom: 'une entreprise',
		},
		localisation: 'paris',
		niveauRequis: 'débutant',
		titre: 'un titre',
		typeDeContrat: 'apprentissage',
		...override,
	};
}
