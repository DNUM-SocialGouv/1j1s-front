export interface StrapiFicheMetier {
	acces_metier: string;
	accroche_metier: string;
	centres_interet: StrapiFicheMetier.CentreInteret[];
	competences: string;
	condition_travail: string;
	formations_min_requise: StrapiFicheMetier.FormationMinRequise[];
	id: string;
	identifiant: string;
	nature_travail: string;
	niveau_acces_min: StrapiFicheMetier.NiveauAccesMin[];
	nom_metier: string;
	secteurs_activite: StrapiFicheMetier.SecteurActivite[];
	statuts: StrapiFicheMetier.Statut[];
	vie_professionnelle: string;
}

export namespace StrapiFicheMetier {
	export interface CentreInteret {
		identifiant: string
		libelle: string
	}

	export interface FormationMinRequise {
		identifiant: string
		libelle: string
	}

	export interface NiveauAccesMin {
		identifiant: string
		libelle: string
	}

	export interface SecteurActivite {
		identifiant: string
		libelle: string
	}

	export interface Statut {
		id_ideo1: string
		identifiant: string
		libelle: string
	}
}
