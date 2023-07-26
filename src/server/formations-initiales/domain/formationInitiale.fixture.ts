import {
	FormationInitiale,
	FormationInitialeFiltre, ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';


export function aResultatFormationInitiale(override?: Partial<ResultatRechercheFormationsInitiales>): ResultatRechercheFormationsInitiales{
	return {
		formationsInitiales: [aFormationInitiale()], 
		nombreDeResultat: 150,
		...override,
	};
}
export function aFormationInitiale(override?: Partial<FormationInitiale>): FormationInitiale {
	return {
		identifiant: 'FOR.1234',
		libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		tags: ['Certifiante', 'Bac + 2', '1 an'],
		...override,
	};
}

export function aFormationInitialeFiltre(override?: Partial<FormationInitialeFiltre>): FormationInitialeFiltre {
	return {
		motCle: 'classe préparatoire',
		page: 1,
		...override,
	};
}
