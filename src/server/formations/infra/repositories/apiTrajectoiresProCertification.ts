export namespace ApiTrajectoiresProCertificationResponse {
	export interface Region {
		nom?: string
	}
}

export interface ApiTrajectoiresProCertificationResponse {
	region?: ApiTrajectoiresProCertificationResponse.Region
	taux_en_emploi_6_mois?: string
	taux_en_formation?: string
	taux_autres_6_mois?: string
	millesime?: string
}
