import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		...override,
	};
}
