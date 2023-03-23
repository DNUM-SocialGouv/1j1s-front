type AuMoinsUnTaux = {
	tauxEnEmploi6Mois: string
	tauxEnFormation?: string
	tauxAutres6Mois?: string
} | {
	tauxEnEmploi6Mois?: string
	tauxEnFormation: string
	tauxAutres6Mois?: string
} | {
	tauxEnEmploi6Mois?: string
	tauxEnFormation?: string
	tauxAutres6Mois: string
};

export type Statistique = {
	region: string
	millesime?: string
} & AuMoinsUnTaux
