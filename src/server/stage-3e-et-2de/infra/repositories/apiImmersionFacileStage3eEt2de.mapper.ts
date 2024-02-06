import {
	CandidatureEmailStage3eEt2de,
	CandidatureStage3eEt2de,
	CandidatureTelephoneStage3eEt2de,
} from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { ResultatRechercheStage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

import {
	ApiImmersionFacileStage3eEt2deCandidature,
	ApiImmersionFacileStage3eEt2deRechercheResponse,
} from './apiImmersionFacileStage3eEt2de';

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
			appellationLibelle: stage3eEt2de.appellations.map((appellation) => appellation.appellationLabel),
			domaine: stage3eEt2de.romeLabel,
			modeDeContact: stage3eEt2de.contactMode,
			nomEntreprise: stage3eEt2de.name,
			nombreDeSalaries: stage3eEt2de.numberOfEmployeeRange ? stage3eEt2de.numberOfEmployeeRange : undefined,
			siret: stage3eEt2de.siret,
		})),
	};
}

function isCandidatureTelephone(candidature: CandidatureStage3eEt2de): candidature is CandidatureTelephoneStage3eEt2de {
	return candidature.modeDeContact === 'PHONE';
}

function isCandidatureEmail(candidature: CandidatureStage3eEt2de): candidature is CandidatureEmailStage3eEt2de {
	return candidature.modeDeContact === 'EMAIL';
}

export function mapToApiImmersionFacileStage3eEt2deCandidature(candidature: CandidatureTelephoneStage3eEt2de | CandidatureEmailStage3eEt2de | CandidatureStage3eEt2de): ApiImmersionFacileStage3eEt2deCandidature {
	if (isCandidatureTelephone(candidature)) {
		return {
			appellationCode: candidature.appellationCode,
			contactMode: candidature.modeDeContact,
			potentialBeneficiaryEmail: candidature.email,
			potentialBeneficiaryFirstName: candidature.prenom,
			potentialBeneficiaryLastName: candidature.nom,
			siret: candidature.siret,
		};
	}
	if (isCandidatureEmail(candidature)) {
		return {
			appellationCode: candidature.appellationCode,
			contactMode: candidature.modeDeContact,
			immersionObjective: candidature.objectif,
			message: candidature.message,
			potentialBeneficiaryEmail: candidature.email,
			potentialBeneficiaryFirstName: candidature.prenom,
			potentialBeneficiaryLastName: candidature.nom,
			potentialBeneficiaryPhone: candidature.telephone,
			siret: candidature.siret,
		};
	}
	return {
		appellationCode: candidature.appellationCode,
		contactMode: candidature.modeDeContact,
		potentialBeneficiaryEmail: candidature.email,
		potentialBeneficiaryFirstName: candidature.prenom,
		potentialBeneficiaryLastName: candidature.nom,
		siret: candidature.siret,
	};
}
