import { Alternance } from '~/server/alternances/domain/alternance';

export function aDetailAlternance(override?: Partial<Alternance>): Alternance {
	return {
		description: 'description',
		entreprise: {
		  nom: 'une entreprise',
		},
		id: '123',
		localisation: 'paris',
		natureDuContrat: 'Contrat alternance',
		niveauRequis: 'débutant',
		rythmeAlternance: '3 jours en entreprise, 2 jours en formation',
		source: Alternance.Source.MATCHA,
		tags: ['tag1', 'tag2'],
		titre: 'un titre',
		typeDeContrat: ['apprentissage'],
		...override,
	};
}
