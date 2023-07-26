export interface FormationInitiale {
    libelle: string;
    tags: Array<string>
    identifiant?: string
}

export interface ResultatRechercheFormationsInitiales {
	nombreDeResultat: number
	formationsInitiales: Array<FormationInitiale>
}

export interface FormationInitialeFiltre {
	motCle?: string;
	page: number
}


export const NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE = 15;
