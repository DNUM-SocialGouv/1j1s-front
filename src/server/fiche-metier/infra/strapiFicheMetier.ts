export interface StrapiFicheMetier {
	acces_metier: string;
	accroche_metier: string;
	centres_interet: StrapiFicheMetierCentreInteret[];
	competences: string;
	condition_travail: string;
	formations_min_requise: StrapiFicheMetierFormationMinRequise[];
	id: string;
	identifiant: string;
	nature_travail: string;
	niveau_acces_min: StrapiFicheMetierNiveauAccesMin[];
	nom_metier: string;
	secteurs_activite: StrapiFicheMetierSecteurActivite[];
	statuts: StrapiFicheMetierStatut[];
	vie_professionnelle: string;
}

export interface StrapiFicheMetierCentreInteret {
    identifiant: string
    libelle: string
}

export interface StrapiFicheMetierFormationMinRequise {
    identifiant: string
    libelle: string
}

export interface StrapiFicheMetierNiveauAccesMin {
    identifiant: string
    libelle: string
}

export interface StrapiFicheMetierSecteurActivite {
    identifiant: string
    libelle: string
}

export interface StrapiFicheMetierStatut {
    id_ideo1: string
    identifiant: string
    libelle: string
}
