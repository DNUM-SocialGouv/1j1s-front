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

export interface StatistiquesMappées {
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

export function isRegionEtAuMoinsUnPourcentageDisponible(statistiquesMappées: StatistiquesMappées): statistiquesMappées is StatistiqueAvecRegionEtAuMoinsUnPourcentage {
	const isRegionStatistiqueDisponible = !!statistiquesMappées.region;
	const isStatistiqueDisponible = !!statistiquesMappées.tauxEnEmploi6Mois || !!statistiquesMappées.tauxEnFormation || !!statistiquesMappées.tauxAutres6Mois;
	return isRegionStatistiqueDisponible && isStatistiqueDisponible;
}
