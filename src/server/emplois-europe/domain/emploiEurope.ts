export interface ResultatRechercheEmploiEurope {
	offreList: EmploiEurope[];
	nombreResultats: number;
}

export interface EmploiEurope {
	id: string;
}

export interface EmploiEuropeFiltre {
	motCle?: string;
}
