import { CandidatureStage3eEt2de } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

import {
	ApiImmersionFacileStage3eEt2deCandidature,
	ApiImmersionFacileStage3eEt2deRechercheResponse,
} from './apiImmersionFacileStage3eEt2de';

// function mapModeDeContact(stage3eEt2de: ApiImmersionFacileStage3eEt2deRechercheResponse): string | undefined {
// 	switch (stage3eEt2de.contactMode) {
// 		case ModeDeContact.IN_PERSON:
// 			return 'Candidature en personne';
// 		case ModeDeContact.EMAIL:
// 			return 'Candidature par e-mail';
// 		case ModeDeContact.PHONE:
// 			return 'Candidature par téléphone';
// 		default:
// 			if (stage3eEt2de.voluntaryToImmersion) {
// 				return 'Candidature spontanée';
// 			}
// 			return undefined;
// 	}
// }

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
			appellationCodes: stage3eEt2de.appellations.map((appellation) => appellation.appellationCode),
			domaine: stage3eEt2de.romeLabel,
			modeDeContact: stage3eEt2de.contactMode,
			nomEntreprise: stage3eEt2de.name,
			nombreDeSalaries: stage3eEt2de.numberOfEmployeeRange ? stage3eEt2de.numberOfEmployeeRange : undefined,
			siret: stage3eEt2de.siret,
		})),
	};
}

export function mapCandidatureStage3eEt2de(candidature: CandidatureStage3eEt2de): ApiImmersionFacileStage3eEt2deCandidature {
	return {
		appellationCode: candidature.appellationCode,
		contactMode: candidature.modeDeContact,
		potentialBeneficiaryEmail: candidature.email,
		potentialBeneficiaryFirstName: candidature.prenom,
		potentialBeneficiaryLastName: candidature.nom,
		siret: candidature.siret,
	};
}
