export interface FormationInitiale {
    libelle: string;
    tags: Array<string>
    identifiant?: string
}

export interface FormationInitialeDetail {
    libelle: string,
    tags:	string[],
}

export interface FormationInitialeFiltre {
    motCle?: string;
}
