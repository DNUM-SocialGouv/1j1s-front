export namespace ApiTrajectoiresProStatistiqueResponse {
	export interface Region {
		nom?: string
	}
}

export interface ApiTrajectoiresProStatistiqueResponse {
	region?: ApiTrajectoiresProStatistiqueResponse.Region
	taux_en_emploi_6_mois?: string
	taux_en_formation?: string
	taux_autres_6_mois?: string
	millesime?: string
}

export interface StatistiquesMappedFromApi {
	region?: string
	millesime?: string
	tauxEnEmploi6Mois?: string
	tauxEnFormation?: string
	tauxAutres6Mois?: string
}

type AuMoinsUnPourcentage = {
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

export type StatistiqueAvecRegionEtAuMoinsUnPourcentage = {
	region: string
	millesime?: string
} & AuMoinsUnPourcentage

