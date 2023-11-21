import { ResultatRechercheStage3eme } from '../../domain/stage3eme';
import { ApiImmersionFacileStage3emeRechercheResponse } from './apiImmersionFacileStage3eme';

function mapModeDeContact(apiModeDeContact?: string): string | undefined {
	switch (apiModeDeContact) {
		case 'IN_PERSON':
			return 'Candidature en personne';
		case 'EMAIL':
			return 'Candidature par e-mail';
		case 'PHONE':
			return 'Candidature par téléphone';
		default:
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
				ligne: stage3eme.address.streetNumberAndAddress,
				ville: stage3eme.address.city,
			},
			candidatureSpontanee: stage3eme.voluntaryToImmersion !== undefined && !stage3eme.voluntaryToImmersion,
			domaine: stage3eme.romeLabel,
			modeDeContact: mapModeDeContact(stage3eme.contactMode),
			nomEntreprise: stage3eme.name,
			nombreDeSalaries: stage3eme.numberOfEmployeeRange && stage3eme.numberOfEmployeeRange !== ''
				? stage3eme.numberOfEmployeeRange
				: undefined,
		})),
	};
}
