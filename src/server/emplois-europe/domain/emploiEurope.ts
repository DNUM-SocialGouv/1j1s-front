import { NiveauEtudes } from '~/client/domain/niveauEtudesEures';

export interface ResultatRechercheEmploiEurope {
	offreList: EmploiEurope[];
	nombreResultats: number;
}

export interface EmploiEurope {
	id: string;
	titre?: string;
	nomEntreprise?: string;
	pays?: string;
	ville?: string;
	typeContrat?: string;
	urlCandidature?: string;
	tempsDeTravail?: string;
	niveauEtudes?: NiveauEtudes;
}

export interface EmploiEuropeFiltre {
	codePays?: string;
	typeContrat?: string[];
	niveauEtude?: string[];
	motCle?: string;
	page: number;
}
