import { ApiTrajectoiresProStatistiqueResponse, StatistiquesMappedFromApi } from './apiTrajectoiresProStatistique';

export function anApiTrajectoiresProStatistiqueResponse(override?: Partial<ApiTrajectoiresProStatistiqueResponse>): ApiTrajectoiresProStatistiqueResponse {
	return {
		millesime: '2020_2021',
		region: {
			nom: 'Ile-de-France',
		},
		taux_autres_6_mois: undefined,
		taux_en_emploi_6_mois: undefined,
		taux_en_formation: undefined,
		...override,
	};
}

export function aStatistiquesMappedFromApi(overrides?: Partial<StatistiquesMappedFromApi>): StatistiquesMappedFromApi {
	return {
		millesime: '2020-2021',
		region: 'Ile-de-France',
		tauxAutres6Mois: undefined,
		tauxEnEmploi6Mois: undefined,
		tauxEnFormation: undefined,
		...overrides,
	};
}
