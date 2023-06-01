import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { PoleEmploiOffreErrorManagementServiceGet } from './apiPoleEmploiErrorManagement.service';

export function anApiPoleEmploiErrorManagementGet(override?: Partial<PoleEmploiOffreErrorManagementServiceGet>): PoleEmploiOffreErrorManagementServiceGet {
	return {
		handleFailureError: jest.fn(() => createFailure(ErreurMétier.DEMANDE_INCORRECTE)),
		isError: jest.fn(() => false),
		...override,
	};
}
