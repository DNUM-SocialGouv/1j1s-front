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
}

export interface EmploiEuropeFiltre {
	codePays?: string;
	motCle?: string;
	page: number;
}
