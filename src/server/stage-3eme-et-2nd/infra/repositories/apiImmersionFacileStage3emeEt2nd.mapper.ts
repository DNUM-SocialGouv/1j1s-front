
import { ResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';

import { ApiImmersionFacileStage3emeEt2ndRechercheResponse } from './apiImmersionFacileStage3emeEt2nd';

function mapModeDeContact(stage3eme: ApiImmersionFacileStage3emeEt2ndRechercheResponse): string | undefined {
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

export function mapRechercheStage3emeEt2nd(apiResponse: Array<ApiImmersionFacileStage3emeEt2ndRechercheResponse>): ResultatRechercheStage3emeEt2nd {
	return {
		nombreDeResultats: apiResponse.length,
		resultats: apiResponse.map((stage3emeEt2nd) => ({
			accessiblePersonnesEnSituationDeHandicap: stage3emeEt2nd.fitForDisabledWorkers,
			adresse: {
				codeDepartement: stage3emeEt2nd.address.departmentCode,
				codePostal: stage3emeEt2nd.address.postcode,
				rueEtNumero: stage3emeEt2nd.address.streetNumberAndAddress,
				ville: stage3emeEt2nd.address.city,
			},
			domaine: stage3emeEt2nd.romeLabel,
			modeDeContact: mapModeDeContact(stage3emeEt2nd),
			nomEntreprise: stage3emeEt2nd.name,
			nombreDeSalaries: stage3emeEt2nd.numberOfEmployeeRange ? stage3emeEt2nd.numberOfEmployeeRange : undefined,
		})),
	};
}
