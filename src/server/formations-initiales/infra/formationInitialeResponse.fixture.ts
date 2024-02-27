import {
	FormationInitialeApiResponse,
	ResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';


export function aResultatRechercheFormationInitialeApiResponse(override?: Partial<ResultatRechercheFormationInitialeApiResponse>): ResultatRechercheFormationInitialeApiResponse {
	return {
		from: 0,
		results: [aFormationInitialeApiResponse()],
		size: 5,
		total: 150,
		...override,
	};
}

export function aFormationInitialeApiResponse(override?: Partial<FormationInitialeApiResponse>): FormationInitialeApiResponse {
	return {
		code_nsf: '110',
		duree: '1 an',
		libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		libelle_type_formation: 'classe préparatoire scientifique et technologique',
		niveau_de_certification: '3',
		niveau_de_sortie_indicatif: 'Bac + 2',
		sigle_type_formation: 'CPGE',
		url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
		...override,
	};
}
