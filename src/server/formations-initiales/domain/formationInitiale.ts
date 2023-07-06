export interface FormationInitiale {
    libelle: string;
}

export interface FormationInitialeDetail {
    libelle: string,
    tags:	string[],
}

export interface FormationInitialeFiltre {
    motCle?: string;
}
