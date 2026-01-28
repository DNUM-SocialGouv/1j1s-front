import { Alternance, AlternanceSource } from '~/server/alternances/domain/alternance';
import { AlternanceStatus } from '~/server/alternances/infra/status';

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
		source: AlternanceSource.MATCHA,
		status: AlternanceStatus.ACTIVE,
		titre: 'un titre',
		typeDeContrat: ['apprentissage'],
		...override,
	};
}
