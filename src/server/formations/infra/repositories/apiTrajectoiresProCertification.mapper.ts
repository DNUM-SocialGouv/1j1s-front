import { Certification } from '~/server/formations/domain/certification';
import { ApiTrajectoiresProCertificationResponse } from '~/server/formations/infra/repositories/apiTrajectoiresProCertification';

function mapMillesime(millesime: string | undefined) {
	if (!millesime) return undefined;

	return millesime.replace('_', '-');
}

export function mapCertification(apiResponse: ApiTrajectoiresProCertificationResponse): Certification {
	return {
		millesime: mapMillesime(apiResponse.millesime),
		region: apiResponse.region?.nom,
		tauxAutres6Mois: apiResponse.taux_autres_6_mois,
		tauxEnEmploi6Mois: apiResponse.taux_en_emploi_6_mois,
		tauxEnFormation: apiResponse.taux_en_formation,
	};
}
