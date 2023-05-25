import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

export function anErrorManagementService(override?: Partial<ErrorManagementService>): ErrorManagementService {
	return {
		handleFailureError: jest.fn(),
		...override,
	};
}
