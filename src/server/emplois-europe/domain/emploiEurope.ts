export interface ResultatRechercheEmploiEurope {
	offreList: EmploiEurope[];
}

export interface EmploiEurope {
	id: string;
}

export interface EmploiEuropeFiltre {
	motCle?: string;
}
