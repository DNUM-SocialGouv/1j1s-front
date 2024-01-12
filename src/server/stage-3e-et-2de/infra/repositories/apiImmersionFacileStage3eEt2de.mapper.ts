
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

import { ApiImmersionFacileStage3eEt2deRechercheResponse } from './apiImmersionFacileStage3eEt2de';

function mapModeDeContact(stage3eEt2de: ApiImmersionFacileStage3eEt2deRechercheResponse): string | undefined {
	switch (stage3eEt2de.contactMode) {
		case 'IN_PERSON':
			return 'Candidature en personne';
		case 'EMAIL':
			return 'Candidature par e-mail';
		case 'PHONE':
			return 'Candidature par téléphone';
		default:
			if (stage3eEt2de.voluntaryToImmersion) {
				return 'Candidature spontanée';
			}
			return undefined;
	}
}

export function mapRechercheStage3eEt2de(apiResponse: Array<ApiImmersionFacileStage3eEt2deRechercheResponse>): ResultatRechercheStage3eEt2de {
	return {
		nombreDeResultats: apiResponse.length,
		resultats: apiResponse.map((stage3eEt2de) => ({
			accessiblePersonnesEnSituationDeHandicap: stage3eEt2de.fitForDisabledWorkers,
			adresse: {
				codeDepartement: stage3eEt2de.address.departmentCode,
				codePostal: stage3eEt2de.address.postcode,
				rueEtNumero: stage3eEt2de.address.streetNumberAndAddress,
				ville: stage3eEt2de.address.city,
			},
			domaine: stage3eEt2de.romeLabel,
			modeDeContact: mapModeDeContact(stage3eEt2de),
			nomEntreprise: stage3eEt2de.name,
			nombreDeSalaries: stage3eEt2de.numberOfEmployeeRange ? stage3eEt2de.numberOfEmployeeRange : undefined,
		})),
	};
}
