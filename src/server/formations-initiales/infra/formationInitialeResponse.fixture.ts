import {
	FormationInitialeApiResponse,
	ResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';


export function aResultatRechercheFormationInitialeApiResponse(override?: Partial<ResultatRechercheFormationInitialeApiResponse>): ResultatRechercheFormationInitialeApiResponse {
	return {
		from: 0,
		results: [aFormationInitialeApiResponse()],
		size: 5,
		total: 10,
		...override,
	};
}

export function aFormationInitialeApiResponse(override?: Partial<FormationInitialeApiResponse>): FormationInitialeApiResponse {
	return {
		code_nsf: '110',
		code_rncp: '',
		'domainesous-domaine': 'mécanique/automatismes | sciences/chimie | électricité, électronique, robotique/électronique | électricité, électronique, robotique/électrotechnique | mécanique/mécanique (généralités) | sciences/physique | électricité, électronique, robotique/télécommunications',
		duree: '1 an',
		libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
		libelle_niveau_de_certification: 'niveau 5 (bac + 2)',
		libelle_type_formation: 'classe préparatoire scientifique et technologique',
		niveau_de_certification: '3',
		niveau_de_sortie_indicatif: 'Bac + 2',
		sigle_formation: '',
		sigle_type_formation: 'CPGE',
		tutelle: 'Ministère chargé de l\'Enseignement supérieur et de la Recherche',
		url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.3311',
		...override,
	}; // TODO : supprimer les champs dont on a pas besoin
}
