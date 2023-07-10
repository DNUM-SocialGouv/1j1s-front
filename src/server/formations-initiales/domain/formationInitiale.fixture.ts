import {
	FormationInitiale,
	FormationInitialeDetail,
	FormationInitialeFiltre,
} from '~/server/formations-initiales/domain/formationInitiale';

export function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		...override,
	};
}
export function aFormationInitialeDetail(override?: Partial<FormationInitialeDetail>): FormationInitialeDetail {
	return {
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		tags: ['1 an', 'Bac + 2', 'Certifiante'],
		...override,
	};
}

export function aFormationInitialeFiltre(override?: Partial<FormationInitialeFiltre>): FormationInitialeFiltre {
	return {
		motCle: 'classe préparatoire',
		...override,
	};
}
