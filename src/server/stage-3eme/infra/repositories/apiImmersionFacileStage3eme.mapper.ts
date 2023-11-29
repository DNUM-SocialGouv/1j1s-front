import { ResultatRechercheStage3eme } from '../../domain/stage3eme';
import { ApiImmersionFacileStage3emeRechercheResponse } from './apiImmersionFacileStage3eme';

function mapModeDeContact(stage3eme: ApiImmersionFacileStage3emeRechercheResponse): string | undefined {
	switch (stage3eme.contactMode) {
		case 'IN_PERSON':
			return 'Candidature en personne';
		case 'EMAIL':
			return 'Candidature par e-mail';
		case 'PHONE':
			return 'Candidature par téléphone';
		default:
			if (stage3eme.voluntaryToImmersion) {
				return 'Candidature spontanée';
			}
			return undefined;
	}
}

export function mapRechercheStage3eme(apiResponse: Array<ApiImmersionFacileStage3emeRechercheResponse>): ResultatRechercheStage3eme {
	return {
		nombreDeResultats: apiResponse.length,
		resultats: apiResponse.map((stage3eme) => ({
			adresse: {
				codeDepartement: stage3eme.address.departmentCode,
				codePostal: stage3eme.address.postcode,
				rueEtNumero: stage3eme.address.streetNumberAndAddress,
				ville: stage3eme.address.city,
			},
			domaine: stage3eme.romeLabel,
			modeDeContact: mapModeDeContact(stage3eme),
			nomEntreprise: stage3eme.name,
			nombreDeSalaries: stage3eme.numberOfEmployeeRange ? stage3eme.numberOfEmployeeRange : undefined,
		})),
	};
}
