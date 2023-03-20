import { Statistique } from '~/server/formations/domain/statistique';
import { ApiTrajectoiresProStatistiqueResponse } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';

function mapMillesime(millesime?: string) {
	if (!millesime) return undefined;

	return millesime.replace('_', '-');
}

export function mapStatistique(apiResponse: ApiTrajectoiresProStatistiqueResponse): Statistique {
	return {
		millesime: mapMillesime(apiResponse.millesime),
		region: apiResponse.region?.nom,
		tauxAutres6Mois: apiResponse.taux_autres_6_mois,
		tauxEnEmploi6Mois: apiResponse.taux_en_emploi_6_mois,
		tauxEnFormation: apiResponse.taux_en_formation,
	};
}
