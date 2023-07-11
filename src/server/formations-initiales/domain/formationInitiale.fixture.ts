import {
	FormationInitiale,
	FormationInitialeDetail,
	FormationInitialeFiltre,
} from '~/server/formations-initiales/domain/formationInitiale';

export function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		identifiant: 'FOR.1234',
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		tags: ['Certifiante', 'Bac + 2', '1 an'],
		...override,
	};
}

export function aFormationInitialeDetail(override?: Partial<FormationInitialeDetail>): FormationInitialeDetail {
	return {
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		tags: ['Certifiante', 'Bac + 2', '1 an'],
		...override,
	};
}

export function aFormationInitialeFiltre(override?: Partial<FormationInitialeFiltre>): FormationInitialeFiltre {
	return {
		motCle: 'classe préparatoire',
		...override,
	};
}
