import {
	FormationInitiale,
	FormationInitialeDetailAvecInformationsComplementaires,
	FormationInitialeDetailCMS,
	FormationInitialeFiltre,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';

export function aFormationInitialeFiltre(override?: Partial<FormationInitialeFiltre>): FormationInitialeFiltre {
	return {
		motCle: 'classe préparatoire',
		page: 1,
		...override,
	};
}

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
		url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
		...override,
	};
}

export function aFormationInitialeDetailCMS(override?: Partial<FormationInitialeDetailCMS>): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
		conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
		dateDeMiseAJour: new Date('2023-05-15T09:37:44.283Z'),
		description: 'Je suis une description de formation initiale',
		poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		...override,
	};
}

export function aFormationInitialeDetailComplete(override?: Partial<FormationInitialeDetailAvecInformationsComplementaires>): FormationInitialeDetailAvecInformationsComplementaires {
	return {
		...aFormationInitiale(),
		...aFormationInitialeDetailCMS(),
		...override,
	};
}
