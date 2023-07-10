export interface FormationInitiale {
	libelle: string;
	tags: Array<string>
}

export interface FormationInitialeDetail {
    libelle: string,
    tags:	string[],
}

export interface FormationInitialeFiltre {
    motCle?: string;
}
