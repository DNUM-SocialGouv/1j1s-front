export interface FormationInitiale {
    libelle: string;
    tags: Array<string>
    identifiant?: string
}

export interface ResultatRechercheFormationsInitiales {
	nombreDeResultat: number
	formationsInitiales: Array<FormationInitiale>
}

export interface FormationInitialeDetail {
	libelle: string,
	tags: string[],
}

export interface FormationInitialeFiltre {
	motCle?: string;
}
