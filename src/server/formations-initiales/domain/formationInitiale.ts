export const NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE = 15;

export interface FormationInitiale {
	libelle: string;
	url_formation: string
	identifiant?: string
	isCertifiante: boolean
	niveauDeSortie: string
	duree: string
}

export interface ResultatRechercheFormationsInitiales {
	nombreDeResultat: number
	formationsInitiales: Array<FormationInitiale>
}

export interface FormationInitialeFiltre {
	motCle?: string;
	page: number
}

export interface FormationInitialeDetailCMS {
	description?: string
	attendusParcoursup?: string,
	conditionsAcces?: string,
	poursuiteEtudes?: string,
	dateDeMiseAJour: Date,
}

export type FormationInitialeDetailAvecInformationsComplementaires =
	FormationInitiale
	| (FormationInitiale & FormationInitialeDetailCMS);

export function isFormationWithComplementaryInformation(formation: FormationInitialeDetailAvecInformationsComplementaires): formation is (FormationInitiale & FormationInitialeDetailCMS) {
	return 'dateDeMiseAJour' in formation;
}
