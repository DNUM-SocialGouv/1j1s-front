import { ResultatRechercheStage3eme } from '../../domain/stage3eme';
import { ApiImmersionFacileStage3emeRechercheResponse } from './apiImmersionFacileStage3eme';

export function mapRechercheStage3eme(apiResponse: Array<ApiImmersionFacileStage3emeRechercheResponse>): ResultatRechercheStage3eme {
	return {
		nombreDeResultats: apiResponse.length,
		resultats: apiResponse.map((stage3eme) => ({
			adresse: {
				codeDepartement: stage3eme.address.departmentCode,
				codePostal: stage3eme.address.postcode,
				ligne: stage3eme.address.streetNumberAndAddress,
				ville: stage3eme.address.city,
			},
			domaine: stage3eme.romeLabel,
			nomEntreprise: stage3eme.name,
		})),
	};
}
