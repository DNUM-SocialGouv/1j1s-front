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
	urlCandidature?: string;
	// TODO (BRUJ 15/11/2023): URL De candidature obligatoirement ??
}

export interface EmploiEuropeFiltre {
	codePays?: string;
	typeContrat?: string[];
	motCle?: string;
	page: number;
}
