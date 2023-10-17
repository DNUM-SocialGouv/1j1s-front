export interface ResultatRechercheEmploiEurope {
	offreList: EmploiEurope[];
	nombreResultats: number;
}

export interface EmploiEurope {
	id: string;
	titre?: string;
	nomEntreprise?: string;
	tags: string[];
}

export interface EmploiEuropeFiltre {
	motCle?: string;
}
