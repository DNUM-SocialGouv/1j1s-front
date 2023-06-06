import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import {
	DefaultErrorManagementService,
	ErrorManagementWithErrorCheckingService,
	LogInformation,
} from '~/server/services/error/errorManagement.service';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

export const errorFromApiPoleEmploiSearch = [
	'Format du paramètre « motsCles » incorrect. 7 mots-clé au maximum séparés par des virgules et d\'au moins 2 caractères.',
	'La plage de résultats demandée est trop importante.',
	'Format du paramètre « range » incorrect. <entier>-<entier> attendu.',
	'Valeur du paramètre « natureContrat » incorrecte.',
	'Valeur du paramètre « typeContrat » incorrecte.',
	'Valeur du paramètre « departement » incorrecte.',
	'Valeur du paramètre « commune » incorrecte.',
	'Valeur du paramètre « region » incorrecte.',
	'Format du paramètre « tempsPlein » incorrect. Booléen attendu.',
	'Format du paramètre « grandDomaine » incorrect. A, B, C, C15, D, E, F, G, H, I, J, K, L, L14, M15, M18, M, M16, M17, M13, M14 ou N attendu.',
	'Format du paramètre « experienceExigence » incorrect. D, E ou S attendu.',
];

export const errorFromApiPoleEmploiGet = 'Le format de l\'id de l\'offre recherchée est incorrect.';

export class ApiPoleEmploiOffreErrorManagementServiceSearch extends DefaultErrorManagementService {
	handleFailureError(error: unknown, logInformation: LogInformation) {
		if (isHttpError(error)) {
			return this.handleHttpErrorFailure(error, logInformation);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	protected handleHttpErrorFailure(error: HttpError, logInformation: LogInformation) {
		if (error.response?.status === 400 && errorFromApiPoleEmploiSearch.includes(error.response.data?.message)) {
			const warnToLog = new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: error.response?.data },
			);
			this.loggerService.warnWithExtra(warnToLog);
		} else {
			this.logHttpError(logInformation, error);
		}
		return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}

export class ApiPoleEmploiOffreErrorManagementServiceGet extends DefaultErrorManagementService implements ErrorManagementWithErrorCheckingService {
	handleFailureError(error: unknown, logInformation: LogInformation) {
		if (this.isError(error)) {
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		}
		if (isHttpError(error)) {
			return this.handleHttpErrorFailure(error, logInformation);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	isError(response: unknown): response is { status: number } {
		return Boolean(response
			&& typeof response === 'object'
			&& 'status' in response
			&& response.status === 204);
	}

	protected handleHttpErrorFailure(error: HttpError, logInformation: LogInformation) {
		if (error.response?.status === 400 && error.response.data?.message === errorFromApiPoleEmploiGet) {
			const warnToLog = new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: error.response?.data },
			);
			this.loggerService.warnWithExtra(warnToLog);
		} else {
			this.logHttpError(logInformation, error);
		}
		return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}


