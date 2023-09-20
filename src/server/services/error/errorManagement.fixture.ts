import { ValidationError } from 'joi';

import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	ErrorManagementService,
	ErrorManagementWithErrorCheckingService,
	LogInformation,
} from '~/server/services/error/errorManagement.service';

export function anErrorManagementService(override?: Partial<ErrorManagementService>): ErrorManagementService {
	return {
		handleFailureError: jest.fn(() => createFailure(ErreurMetier.DEMANDE_INCORRECTE)),
		handleValidationError: jest.fn(),
		...override,
	};
}

export function aLogInformation(override?: Partial<LogInformation>): LogInformation {
	return {
		apiSource: 'API Source',
		contexte: 'contexte de la requête',
		message: 'message d‘erreur',
		...override,
	};
}

export function anErrorManagementWithErrorCheckingService(override?: Partial<ErrorManagementWithErrorCheckingService>): ErrorManagementWithErrorCheckingService {
	return {
		handleFailureError: jest.fn(() => createFailure(ErreurMetier.DEMANDE_INCORRECTE)),
		handleValidationError: jest.fn(),
		isError: jest.fn(() => false),
		...override,
	};
}

export function aValidationError(override?: Partial<ValidationError>): ValidationError {
	return {
		_original: undefined,
		annotate() { return ''; },
		details: [],
		isJoi: false,
		message: '',
		name: 'ValidationError',
		stack: '',
		...override,
	};
}
