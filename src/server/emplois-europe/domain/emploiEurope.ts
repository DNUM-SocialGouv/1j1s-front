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
}

export interface EmploiEuropeFiltre {
	codePays?: string;
	typeContrat?: string[];
	motCle?: string;
	page: number;
}
